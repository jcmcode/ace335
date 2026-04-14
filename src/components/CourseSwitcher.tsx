'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCourseFromPath } from '@/lib/courses'

export default function CourseSwitcher({ variant = 'sidebar' }: { variant?: 'sidebar' | 'hero' }) {
  const pathname = usePathname()
  const active = getCourseFromPath(pathname)

  if (variant === 'hero') {
    return (
      <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-800/60 border border-white/[0.06]">
        <Link
          href="/"
          className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors ${
            active === '335'
              ? 'bg-indigo-500/30 text-indigo-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ACE 335
        </Link>
        <Link
          href="/328"
          className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors ${
            active === '328'
              ? 'bg-cyan-500/30 text-cyan-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ACE 328
        </Link>
      </div>
    )
  }

  return (
    <div className="flex gap-1 px-3 pt-3">
      <Link
        href="/"
        className={`flex-1 text-center px-2 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
          active === '335'
            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-transparent'
        }`}
      >
        ACE 335
      </Link>
      <Link
        href="/328"
        className={`flex-1 text-center px-2 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
          active === '328'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-transparent'
        }`}
      >
        ACE 328
      </Link>
    </div>
  )
}
