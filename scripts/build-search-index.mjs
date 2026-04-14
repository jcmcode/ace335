import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const chapterMeta335 = {
  'introduction': 'Introduction',
  'signal-spaces': 'Signal Spaces',
  'dual-spaces': 'Dual Spaces & Distributions',
  'systems': 'Systems',
  'fourier': 'Fourier Transform',
  'frequency-domain': 'Frequency Domain',
  'laplace-z': 'Laplace & Z-Transform',
  'control-frequency': 'Control Design',
  'state-space': 'State Space',
  'sampling': 'Sampling',
  'stability': 'Stability & Lyapunov',
  'controllability': 'Controllability',
  'appendix-integration': 'Appendix: Integration',
  'appendix-cauchy': 'Appendix: Cauchy Integral',
}

const chapterMeta328 = {
  'topological-spaces': 'Topological Spaces',
  'metric-spaces': 'Metric Spaces',
  'interior-closure-boundary': 'Interior, Closure & Boundary',
  'continuity': 'Continuity & Limits',
  'sequences-convergence': 'Sequences & Convergence',
  'completeness': 'Completeness',
  'compactness': 'Compactness',
  'connectedness': 'Connectedness',
  'sequences-of-functions': 'Function Sequences',
  'term-by-term': 'Term-by-Term',
  'power-series': 'Power Series',
}

const COMPONENT_TYPES = ['Definition', 'Theorem', 'Lemma', 'Corollary', 'Proposition', 'Example', 'Remark', 'Proof']

function stripMdx(text) {
  return text
    .replace(/<\/?[A-Z][^>]*>/g, '')
    .replace(/\$\$[^$]*\$\$/g, '')
    .replace(/\$[^$]+\$/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}

function extractFromFile(filePath, chapterSlug, course, chapterMap) {
  const content = fs.readFileSync(filePath, 'utf8')
  const items = []

  const headingPattern = /^(#{2,3})\s+([^\n]+)$/gm
  let m
  while ((m = headingPattern.exec(content)) !== null) {
    const level = m[1].length
    const title = m[2].trim()
    items.push({
      type: 'Section',
      title,
      content: '',
      chapter: chapterMap[chapterSlug] || chapterSlug,
      chapterSlug,
      course,
      anchor: slugify(title),
      level,
    })
  }

  for (const type of COMPONENT_TYPES) {
    const pattern = new RegExp(
      '<' + type + '(?:\\s+[^>]*?title="([^"]+)")?[^>]*>([\\s\\S]*?)</' + type + '>',
      'g'
    )
    let match
    while ((match = pattern.exec(content)) !== null) {
      const title = match[1] || ''
      const body = match[2] || ''
      const cleaned = stripMdx(body).slice(0, 300)
      items.push({
        type,
        title: title || type,
        content: cleaned,
        chapter: chapterMap[chapterSlug] || chapterSlug,
        chapterSlug,
        course,
        anchor: title ? slugify(title) : '',
      })
    }
  }

  return items
}

function indexCourse(course, chapterMap) {
  const base = course === '328' ? 'src/content/328' : 'src/content'
  const chaptersDir = path.join(root, base, 'chapters')
  const items = []

  if (fs.existsSync(chaptersDir)) {
    const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.mdx'))
    for (const f of files) {
      const slug = f.replace(/\.mdx$/, '')
      const filePath = path.join(chaptersDir, f)
      items.push(...extractFromFile(filePath, slug, course, chapterMap))
    }
  }

  const homeworkDir = path.join(root, base, 'homework')
  if (fs.existsSync(homeworkDir)) {
    const hwFiles = fs.readdirSync(homeworkDir).filter(f => f.endsWith('.mdx'))
    for (const f of hwFiles) {
      const id = f.replace(/^hw/, '').replace(/\.mdx$/, '')
      const filePath = path.join(homeworkDir, f)
      const content = fs.readFileSync(filePath, 'utf8')
      const pattern = /<Problem(?:\s+[^>]*?title="([^"]+)")?[^>]*>([\s\S]*?)<\/Problem>/g
      let match
      while ((match = pattern.exec(content)) !== null) {
        items.push({
          type: 'Problem',
          title: match[1] || 'Problem',
          content: stripMdx(match[2] || '').slice(0, 200),
          chapter: course === '328'
            ? 'Problem Set ' + id
            : (id === '0' ? 'Review HW' : 'Homework ' + id),
          chapterSlug: '__hw__' + id,
          course,
          anchor: '',
        })
      }
    }
  }

  return items
}

const allItems = [
  ...indexCourse('335', chapterMeta335),
  ...indexCourse('328', chapterMeta328),
]

const outDir = path.join(root, 'src/data')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, 'search-index.json'),
  JSON.stringify(allItems, null, 0)
)

console.log('Built search index: ' + allItems.length + ' items')
