import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllHomeworkIds } from '@/lib/content'

export const metadata = {
  title: 'Problem Sets — ACE 328',
  description: 'Complete worked solutions for all MTHE 328 problem sets',
}

const psTitles: Record<string, string> = {
  '1': 'Topological & Metric Spaces',
  '2': 'Continuity, Sequences & Convergence',
  '3': 'Compactness & Connectedness',
  '4': 'Function Sequences & Uniform Convergence',
}

export default function HomeworkIndex328() {
  const available = getAllHomeworkIds('328')

  return (
    <div>
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-3">
          <Link href="/328" className="hover:text-cyan-500 transition-colors">ACE 328</Link>
          <span>/</span>
          <span className="text-slate-600">Problem Sets</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Problem Sets
        </h1>
        <p className="mt-3 text-[15px] text-slate-500 leading-relaxed max-w-2xl">
          Complete worked solutions for all MTHE / MATH 328 problem sets, Winter 2026. Each problem includes the full statement followed by a detailed, step-by-step solution.
        </p>
      </header>

      <div className="space-y-2">
        {['1', '2', '3', '4'].map(id => {
          const isAvailable = available.includes(id)
          const title = psTitles[id] || `Problem Set ${id}`

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
              href={`/328/homework/${id}`}
              className="group flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white hover:border-cyan-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-cyan-50 text-[13px] font-mono font-semibold text-cyan-600 group-hover:bg-cyan-100 transition-colors">
                {id}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-800 group-hover:text-cyan-600 transition-colors">{title}</div>
                <div className="text-[11px] text-slate-400">MTHE 328 · Winter 2026</div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-cyan-400 transition-colors" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
