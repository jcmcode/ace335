import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'src/content')

export function getChapterContent(slug: string) {
  const filePath = path.join(contentDir, 'chapters', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  return { frontmatter: data, content }
}

export function getHomeworkContent(id: string) {
  const filePath = path.join(contentDir, 'homework', `hw${id}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  return { frontmatter: data, content }
}

export function getExamContent(id: string) {
  const filePath = path.join(contentDir, 'exams', `${id}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  return { frontmatter: data, content }
}

export function getAllHomeworkIds(): string[] {
  const dir = path.join(contentDir, 'homework')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/^hw/, '').replace(/\.mdx$/, ''))
    .sort((a, b) => parseInt(a) - parseInt(b))
}

export function getAllExamIds(): string[] {
  const dir = path.join(contentDir, 'exams')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

export function getAvailableChapterSlugs(): string[] {
  const dir = path.join(contentDir, 'chapters')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}
