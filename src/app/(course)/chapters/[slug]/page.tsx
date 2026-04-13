import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { chapters, getChapterBySlug, getAdjacentChapters } from '@/lib/chapters'
import { getChapterContent } from '@/lib/content'
import MDXContent from '@/components/mdx/MDXContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return chapters.map(ch => ({ slug: ch.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const chapter = getChapterBySlug(slug)
  if (!chapter) return {}
  return {
    title: `Ch ${chapter.number}: ${chapter.shortTitle}`,
    description: chapter.description,
  }
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params
  const chapter = getChapterBySlug(slug)
  if (!chapter) notFound()

  const content = getChapterContent(slug)
  const { prev, next } = getAdjacentChapters(slug)

  return (
    <article>
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-3">
          <Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Chapter {chapter.number}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
          {chapter.title}
        </h1>
        <p className="mt-3 text-[15px] text-slate-500 leading-relaxed max-w-2xl">
          {chapter.description}
        </p>
      </header>

      {/* Content */}
      {content ? (
        <MDXContent source={content.content} />
      ) : (
        <div className="text-center py-24">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
            <span className="text-slate-400 text-lg">&#9997;</span>
          </div>
          <p className="text-slate-500 font-medium">Content in progress</p>
          <p className="text-sm text-slate-400 mt-1">This chapter is being written.</p>
        </div>
      )}

      {/* Prev / Next */}
      <nav className="mt-20 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/chapters/${prev.slug}`}
            className="group flex items-start gap-3 p-4 -m-4 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mt-0.5 text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-0.5">Previous</div>
              <div className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                {prev.shortTitle}
              </div>
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            href={`/chapters/${next.slug}`}
            className="group flex items-start gap-3 p-4 -m-4 rounded-lg hover:bg-slate-50 transition-colors justify-end text-right"
          >
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-0.5">Next</div>
              <div className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                {next.shortTitle}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 mt-0.5 text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
          </Link>
        ) : <div />}
      </nav>
    </article>
  )
}
