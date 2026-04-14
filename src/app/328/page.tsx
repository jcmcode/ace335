import Link from 'next/link'
import { BookOpen, FileText, GraduationCap, ArrowRight } from 'lucide-react'
import { chapters328, groupLabels328, groupDescriptions328 } from '@/lib/chapters-328'
import type { Chapter328 } from '@/lib/chapters-328'
import CourseMindmap328 from '@/components/visualizations/CourseMindmap328'
import CourseSwitcher from '@/components/CourseSwitcher'

const groups = ['foundations', 'structure', 'convergence', 'calculus', 'integration'] as const

const groupColors: Record<Chapter328['group'], { card: string; badge: string; border: string }> = {
  foundations: {
    card: 'hover:border-blue-300 hover:shadow-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    border: 'border-blue-400',
  },
  structure: {
    card: 'hover:border-rose-300 hover:shadow-rose-100',
    badge: 'bg-rose-100 text-rose-700',
    border: 'border-rose-400',
  },
  convergence: {
    card: 'hover:border-teal-300 hover:shadow-teal-100',
    badge: 'bg-teal-100 text-teal-700',
    border: 'border-teal-400',
  },
  calculus: {
    card: 'hover:border-fuchsia-300 hover:shadow-fuchsia-100',
    badge: 'bg-fuchsia-100 text-fuchsia-700',
    border: 'border-fuchsia-400',
  },
  integration: {
    card: 'hover:border-orange-300 hover:shadow-orange-100',
    badge: 'bg-orange-100 text-orange-700',
    border: 'border-orange-400',
  },
}

const problemSets = [
  { id: '1', label: 'PS 1' },
  { id: '2', label: 'PS 2' },
  { id: '3', label: 'PS 3' },
  { id: '4', label: 'PS 4' },
]

const exams = [
  { id: 'test-w24-1', label: 'Test 1 (W24)' },
  { id: 'test-w24-2', label: 'Test 2 (W24)' },
  { id: 'test-w25-1', label: 'Test 1 (W25)' },
  { id: 'test-w25-2', label: 'Test 2 (W25)' },
  { id: 'final-2024', label: 'Final 2024' },
  { id: 'final-2025', label: 'Final 2025' },
]

export const metadata = {
  title: 'ACE 328 — Real Analysis',
  description:
    'Complete course reference for MTHE / MATH 328: Real Analysis at Queen\'s University. Topological and metric spaces, continuity, compactness, completeness, and series of functions.',
}

export default function HomePage328() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(6,182,212,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(244,63,94,0.1),_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-10 lg:pt-14 lg:pb-12">
          <div className="flex justify-end mb-6">
            <CourseSwitcher variant="hero" />
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-white">ACE</span>{' '}
              <span className="text-cyan-400">MTHE 328</span>
            </h1>
            <p className="mt-3 text-xl lg:text-2xl text-slate-300 font-medium">
              Real Analysis
            </p>
            <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Complete course reference covering topological and metric spaces, continuity, compactness, completeness, and series of functions. Worked problem sets, past tests, and final exams.
            </p>
            <div className="mt-6 flex justify-center flex-wrap gap-3">
              <Link
                href="/328/chapters/topological-spaces"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors"
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

          <div className="mt-10">
            <CourseMindmap328 />
          </div>
        </div>
      </header>

      {/* Course Roadmap */}
      <section id="roadmap" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">Course Roadmap</h2>
          <p className="mt-2 text-slate-500 max-w-2xl mx-auto">
            11 chapters building from foundational topology and metric spaces through convergence, compactness, and function spaces.
          </p>
        </div>

        <div className="space-y-12">
          {groups.map(group => {
            const groupChapters = chapters328.filter(c => c.group === group)
            const colors = groupColors[group]
            return (
              <div key={group}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1 h-6 rounded-full ${colors.border}`} />
                  <div>
                    <h3 className="font-semibold text-slate-900">{groupLabels328[group]}</h3>
                    <p className="text-sm text-slate-500">{groupDescriptions328[group]}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupChapters.map(ch => (
                    <Link
                      key={ch.slug}
                      href={`/328/chapters/${ch.slug}`}
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

      {/* Problem Sets & Exams */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <FileText className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Problem Sets</h3>
                  <p className="text-sm text-slate-500">Complete worked solutions</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {problemSets.map(ps => (
                  <Link
                    key={ps.id}
                    href={`/328/homework/${ps.id}`}
                    className="text-center p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:shadow-sm transition-all"
                  >
                    {ps.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Tests & Finals</h3>
                  <p className="text-sm text-slate-500">Past tests and final examinations</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {exams.map(ex => (
                  <Link
                    key={ex.id}
                    href={`/328/exams/${ex.id}`}
                    className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg hover:border-cyan-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                      <span className="text-[13px] font-medium text-slate-700 group-hover:text-cyan-600 transition-colors">
                        {ex.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-400">
          <p>ACE MTHE 328 · Real Analysis · Queen&apos;s University</p>
        </div>
      </footer>
    </div>
  )
}
