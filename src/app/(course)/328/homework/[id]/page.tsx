import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getHomeworkContent, getAllHomeworkIds } from '@/lib/content'
import MDXContent from '@/components/mdx/MDXContent'

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllHomeworkIds('328').map(id => ({ id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  return {
    title: `Problem Set ${id} — ACE 328`,
    description: `Solutions for MTHE 328 Problem Set ${id}`,
  }
}

export default async function HomeworkPage328({ params }: PageProps) {
  const { id } = await params
  const content = getHomeworkContent(id, '328')
  if (!content) notFound()

  const allIds = getAllHomeworkIds('328')
  const currentIdx = allIds.indexOf(id)
  const prevId = currentIdx > 0 ? allIds[currentIdx - 1] : null
  const nextId = currentIdx < allIds.length - 1 ? allIds[currentIdx + 1] : null

  return (
    <article>
      <header className="mb-8">
        <p className="text-sm font-medium text-cyan-600 mb-1">Solutions</p>
        <h1 className="text-3xl font-bold text-slate-900">Problem Set {id}</h1>
        <p className="mt-2 text-slate-500">MTHE / MATH 328 — Real Analysis · Winter 2026</p>
      </header>

      <MDXContent source={content.content} />

      <nav className="mt-16 pt-8 border-t border-slate-200 flex justify-between">
        {prevId !== null ? (
          <Link
            href={`/328/homework/${prevId}`}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">PS {prevId}</span>
          </Link>
        ) : <div />}
        {nextId !== null ? (
          <Link
            href={`/328/homework/${nextId}`}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-600 transition-colors"
          >
            <span className="font-medium">PS {nextId}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </nav>
    </article>
  )
}
