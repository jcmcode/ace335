import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getExamContent, getAllExamIds } from '@/lib/content'
import MDXContent from '@/components/mdx/MDXContent'
import PasswordGate from '@/components/PasswordGate'

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllExamIds('328').map(id => ({ id }))
}

const examLabels: Record<string, string> = {
  'test-w24-1': 'Test 1 (Winter 2024)',
  'test-w24-2': 'Test 2 (Winter 2024)',
  'test-w25-1': 'Test 1 (Winter 2025)',
  'test-w25-2': 'Test 2 (Winter 2025)',
  'final-2024': 'Final Exam 2024',
  'final-2025': 'Final Exam 2025',
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  return {
    title: `${examLabels[id] || id} — ACE 328`,
    description: `MTHE 328 ${examLabels[id] || id}`,
  }
}

export default async function ExamPage328({ params }: PageProps) {
  const { id } = await params
  const content = getExamContent(id, '328')
  if (!content) notFound()

  const label = examLabels[id] || id

  return (
    <article>
      <header className="mb-8">
        <Link
          href="/328/exams"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Tests & Finals
        </Link>
        <p className="text-sm font-medium text-cyan-600 mb-1">Past Exam</p>
        <h1 className="text-3xl font-bold text-slate-900">{label}</h1>
        <p className="mt-2 text-slate-500">MTHE / MATH 328 — Real Analysis</p>
      </header>

      <PasswordGate>
        <MDXContent source={content.content} />
      </PasswordGate>
    </article>
  )
}
