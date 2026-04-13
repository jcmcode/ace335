import Link from 'next/link'
import { FileText } from 'lucide-react'

const exams = [
  { id: 'final-2018', year: 2018, label: 'Final Exam 2018' },
  { id: 'final-2024', year: 2024, label: 'Final Exam 2024' },
  { id: 'final-2025', year: 2025, label: 'Final Exam 2025' },
]

export const metadata = {
  title: 'Past Exams',
  description: 'Past final examinations for MTHE 335',
}

export default function ExamsPage() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium text-indigo-600 mb-1">Practice</p>
        <h1 className="text-3xl font-bold text-slate-900">Past Final Exams</h1>
        <p className="mt-2 text-slate-500">
          Previous final examinations for MTHE / MATH 335. Use these to test your understanding and practice under exam conditions.
        </p>
      </header>

      <div className="grid gap-4">
        {exams.map(exam => (
          <Link
            key={exam.id}
            href={`/exams/${exam.id}`}
            className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
              <FileText className="h-6 w-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {exam.label}
              </h3>
              <p className="text-sm text-slate-500">MTHE / MATH 335</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
