import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'src/content')

// Course-aware path helper
function getCourseContentDir(course: '335' | '328' = '335') {
  return course === '328' ? path.join(contentDir, '328') : contentDir
}

export function getChapterContent(slug: string, course: '335' | '328' = '335') {
  const base = getCourseContentDir(course)
  const filePath = path.join(base, 'chapters', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  return { frontmatter: data, content }
}

export function getHomeworkContent(id: string, course: '335' | '328' = '335') {
  const base = getCourseContentDir(course)
  const filePath = path.join(base, 'homework', `hw${id}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  return { frontmatter: data, content }
}

export function getExamContent(id: string, course: '335' | '328' = '335') {
  const base = getCourseContentDir(course)
  const filePath = path.join(base, 'exams', `${id}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  return { frontmatter: data, content }
}

export function getAllHomeworkIds(course: '335' | '328' = '335'): string[] {
  const base = getCourseContentDir(course)
  const dir = path.join(base, 'homework')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/^hw/, '').replace(/\.mdx$/, ''))
    .sort((a, b) => parseInt(a) - parseInt(b))
}

export function getAllExamIds(course: '335' | '328' = '335'): string[] {
  const base = getCourseContentDir(course)
  const dir = path.join(base, 'exams')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

export function getAvailableChapterSlugs(course: '335' | '328' = '335'): string[] {
  const base = getCourseContentDir(course)
  const dir = path.join(base, 'chapters')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}
