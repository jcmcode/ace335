import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getExamContent, getAllExamIds } from '@/lib/content'
import MDXContent from '@/components/mdx/MDXContent'

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllExamIds().map(id => ({ id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const year = id.replace('final-', '')
  return {
    title: `Final Exam ${year}`,
    description: `MTHE 335 Final Examination ${year}`,
  }
}

export default async function ExamPage({ params }: PageProps) {
  const { id } = await params
  const content = getExamContent(id)
  if (!content) notFound()

  const year = id.replace('final-', '')

  return (
    <article>
      <header className="mb-8">
        <Link
          href="/exams"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Exams
        </Link>
        <p className="text-sm font-medium text-indigo-600 mb-1">Past Exam</p>
        <h1 className="text-3xl font-bold text-slate-900">Final Exam {year}</h1>
        <p className="mt-2 text-slate-500">MTHE / MATH 335 — Mathematics of Engineering Systems</p>
      </header>

      <MDXContent source={content.content} />
    </article>
  )
}
