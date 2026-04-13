import Link from 'next/link'
import { BookOpen, FileText, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react'
import { chapters, groupLabels, groupDescriptions } from '@/lib/chapters'
import type { Chapter } from '@/lib/chapters'
import CourseMindmap from '@/components/visualizations/CourseMindmap'

const groups = ['foundations', 'transforms', 'control', 'advanced', 'appendix'] as const

const groupColors: Record<Chapter['group'], { card: string; badge: string; border: string }> = {
  foundations: {
    card: 'hover:border-blue-300 hover:shadow-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    border: 'border-blue-400',
  },
  transforms: {
    card: 'hover:border-emerald-300 hover:shadow-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-400',
  },
  control: {
    card: 'hover:border-amber-300 hover:shadow-amber-100',
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-amber-400',
  },
  advanced: {
    card: 'hover:border-purple-300 hover:shadow-purple-100',
    badge: 'bg-purple-100 text-purple-700',
    border: 'border-purple-400',
  },
  appendix: {
    card: 'hover:border-slate-300 hover:shadow-slate-100',
    badge: 'bg-slate-100 text-slate-700',
    border: 'border-slate-400',
  },
}

const homeworks = [
  { id: '0', label: 'Review' },
  { id: '1', label: 'HW 1' },
  { id: '2', label: 'HW 2' },
  { id: '3', label: 'HW 3' },
  { id: '4', label: 'HW 4' },
  { id: '5', label: 'HW 5' },
  { id: '6', label: 'HW 6' },
  { id: '7', label: 'HW 7' },
  { id: '8', label: 'HW 8' },
  { id: '9', label: 'HW 9' },
  { id: '10', label: 'HW 10' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(99,102,241,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(16,185,129,0.08),_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 lg:pt-20 lg:pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-white">ACE</span>{' '}
              <span className="text-indigo-400">MTHE 335</span>
            </h1>
            <p className="mt-3 text-xl lg:text-2xl text-slate-300 font-medium">
              Mathematics of Engineering Systems
            </p>
            <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Complete course reference covering 12 chapters from signal spaces to control theory.
              Worked examples, homework solutions, and past exams.
            </p>
            <div className="mt-6 flex justify-center flex-wrap gap-3">
              <Link
                href="/chapters/introduction"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Start Reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#roadmap"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
              >
                Course Roadmap
              </Link>
            </div>
          </div>

          {/* Mindmap */}
          <div className="mt-10">
            <CourseMindmap />
          </div>
        </div>
      </header>

      {/* Course Roadmap */}
      <section id="roadmap" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">Course Roadmap</h2>
          <p className="mt-2 text-slate-500 max-w-2xl mx-auto">
            12 chapters building from functional analysis foundations through transform methods to control system design and analysis.
          </p>
        </div>

        {/* Flow indicator */}
        <div className="hidden lg:flex items-center justify-center gap-4 mb-10">
          {groups.map((group, i) => (
            <div key={group} className="flex items-center gap-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${groupColors[group].badge}`}>
                {groupLabels[group]}
              </span>
              {i < groups.length - 1 && (
                <ChevronRight className="h-4 w-4 text-slate-300" />
              )}
            </div>
          ))}
        </div>

        {/* Chapter grid by group */}
        <div className="space-y-12">
          {groups.map(group => {
            const groupChapters = chapters.filter(c => c.group === group)
            const colors = groupColors[group]
            return (
              <div key={group}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1 h-6 rounded-full ${colors.border}`} />
                  <div>
                    <h3 className="font-semibold text-slate-900">{groupLabels[group]}</h3>
                    <p className="text-sm text-slate-500">{groupDescriptions[group]}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupChapters.map(ch => (
                    <Link
                      key={ch.slug}
                      href={`/chapters/${ch.slug}`}
                      className={`group block p-5 bg-white border border-slate-200 rounded-xl transition-all hover:shadow-lg ${colors.card}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.badge}`}>
                          Ch {ch.number}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1.5 leading-snug">
                        {ch.shortTitle}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                        {ch.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {ch.topics.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                            {t}
                          </span>
                        ))}
                        {ch.topics.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                            +{ch.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Homework & Exams */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Homework */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <FileText className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Homework Solutions</h3>
                  <p className="text-sm text-slate-500">Complete worked solutions for all assignments</p>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {homeworks.map(hw => (
                  <Link
                    key={hw.id}
                    href={`/homework/${hw.id}`}
                    className="text-center p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:shadow-sm transition-all"
                  >
                    {hw.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Exams */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Past Final Exams</h3>
                  <p className="text-sm text-slate-500">Practice with previous year examinations</p>
                </div>
              </div>
              <div className="space-y-2">
                {['2018', '2024', '2025'].map(year => (
                  <Link
                    key={year}
                    href={`/exams/final-${year}`}
                    className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                        Final Exam {year}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-400">
          <p>ACE MTHE 335 &middot; Mathematics of Engineering Systems &middot; Queen&apos;s University</p>
        </div>
      </footer>
    </div>
  )
}
