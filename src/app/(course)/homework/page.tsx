import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import { getAllHomeworkIds } from '@/lib/content'

export const metadata = {
  title: 'Homework Solutions',
  description: 'Complete worked solutions for all MTHE 335 assignments',
}

const hwTitles: Record<string, string> = {
  '0': 'Review Homework',
  '1': 'Linear Spaces, Norms, Metrics',
  '2': 'Inner Products, Hilbert Spaces',
  '3': 'Dual Spaces, Distributions',
  '4': 'Systems, LTI, BIBO Stability',
  '5': 'Fourier Transforms (DDFT, CDFT)',
  '6': 'CCFT, Plancherel, Distributions',
  '7': 'Frequency Domain, Transfer Functions',
  '8': 'Laplace & Z-Transforms',
  '9': 'Control, Nyquist, Root Locus',
  '10': 'State Space, Sampling, Stability',
}

export default function HomeworkIndex() {
  const available = getAllHomeworkIds()

  return (
    <div>
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-3">
          <Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Homework</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Homework Solutions
        </h1>
        <p className="mt-3 text-[15px] text-slate-500 leading-relaxed max-w-2xl">
          Complete worked solutions for all MTHE / MATH 335 assignments, Winter 2026.
          Each problem includes the full statement followed by a detailed, step-by-step solution.
        </p>
      </header>

      <div className="space-y-2">
        {Array.from({ length: 11 }, (_, i) => {
          const id = String(i)
          const isAvailable = available.includes(id)
          const title = hwTitles[id] || `Homework ${id}`

          if (!isAvailable) {
            return (
              <div
                key={id}
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50/50 opacity-50"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-slate-100 text-[13px] font-mono font-semibold text-slate-400">
                  {id}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-400">{title}</div>
                  <div className="text-[11px] text-slate-300">Coming soon</div>
                </div>
              </div>
            )
          }

          return (
            <Link
              key={id}
              href={`/homework/${id}`}
              className="group flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-50 text-[13px] font-mono font-semibold text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                {id}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</div>
                <div className="text-[11px] text-slate-400">MTHE 335 &middot; Winter 2026</div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
