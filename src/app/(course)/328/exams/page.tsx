import Link from 'next/link'
import { FileText } from 'lucide-react'
import { getAllExamIds } from '@/lib/content'

const examMeta: Record<string, { year: string; kind: string; label: string }> = {
  'test-w24-1': { year: '2024', kind: 'Test 1', label: 'Test 1 (Winter 2024)' },
  'test-w24-2': { year: '2024', kind: 'Test 2', label: 'Test 2 (Winter 2024)' },
  'test-w25-1': { year: '2025', kind: 'Test 1', label: 'Test 1 (Winter 2025)' },
  'test-w25-2': { year: '2025', kind: 'Test 2', label: 'Test 2 (Winter 2025)' },
  'final-2024': { year: '2024', kind: 'Final', label: 'Final Exam 2024' },
  'final-2025': { year: '2025', kind: 'Final', label: 'Final Exam 2025' },
}

export const metadata = {
  title: 'Tests & Finals — ACE 328',
  description: 'Past tests and final examinations for MTHE 328',
}

export default function ExamsPage328() {
  const available = getAllExamIds('328')

  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-3">
          <Link href="/328" className="hover:text-cyan-500 transition-colors">ACE 328</Link>
          <span>/</span>
          <span className="text-slate-600">Tests & Finals</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Past Tests & Final Exams</h1>
        <p className="mt-2 text-slate-500">
          Previous tests and final examinations for MTHE / MATH 328. Use these to test your understanding and practice under exam conditions.
        </p>
      </header>

      <div className="grid gap-4">
        {available.map(id => {
          const meta = examMeta[id] || { year: '', kind: 'Exam', label: id }
          return (
            <Link
              key={id}
              href={`/328/exams/${id}`}
              className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all group"
            >
              <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-cyan-50 transition-colors">
                <FileText className="h-6 w-6 text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {meta.label}
                </h3>
                <p className="text-sm text-slate-500">MTHE / MATH 328 · {meta.kind}</p>
              </div>
            </Link>
          )
        })}
        {available.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
            Tests and finals coming soon.
          </div>
        )}
      </div>
    </div>
  )
}
