'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { chapters, groupLabels } from '@/lib/chapters'
import { FileText, GraduationCap, Menu, Search, X } from 'lucide-react'
import SearchDialog from '@/components/SearchDialog'

const groups = ['foundations', 'transforms', 'control', 'advanced', 'appendix'] as const

const groupDots: Record<string, string> = {
  foundations: 'bg-sky-400',
  transforms: 'bg-emerald-400',
  control: 'bg-amber-400',
  advanced: 'bg-violet-400',
  appendix: 'bg-slate-400',
}

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const filtered = chapters

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const nav = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className="flex items-baseline gap-2.5 px-5 py-5 border-b border-white/[0.06]"
      >
        <span className="text-[15px] font-bold text-white tracking-tight">ACE 335</span>
        <span className="text-[11px] text-slate-500 font-medium">MTHE / MATH</span>
      </Link>

      {/* Search */}
      <div className="px-3 py-3">
        <button
          onClick={() => { setSearchOpen(true); setMobileOpen(false) }}
          className="w-full flex items-center gap-2 bg-white/[0.05] text-[13px] text-slate-500 rounded-md pl-2.5 pr-2 py-[7px] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 text-left">Search theorems...</span>
          <kbd className="text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Chapters */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-2 pb-4 space-y-5">
        {groups.map(group => {
          const items = filtered.filter(c => c.group === group)
          if (!items.length) return null
          return (
            <div key={group}>
              <div className="flex items-center gap-2 px-3 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${groupDots[group]}`} />
                <span className="text-[10px] uppercase tracking-[0.1em] text-slate-500 font-semibold">
                  {groupLabels[group]}
                </span>
              </div>
              {items.map(ch => {
                const href = `/chapters/${ch.slug}`
                const active = pathname === href
                return (
                  <Link
                    key={ch.slug}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-baseline gap-2 px-3 py-[5px] rounded-md text-[13px] transition-colors ${
                      active
                        ? 'bg-white/[0.08] text-white font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className={`font-mono text-[11px] min-w-[1rem] ${active ? 'text-indigo-400' : 'text-slate-600'}`}>
                      {ch.number}
                    </span>
                    <span>{ch.shortTitle}</span>
                  </Link>
                )
              })}
            </div>
          )
        })}

        {/* Divider + links */}
        <div className="pt-2 mx-2 border-t border-white/[0.06] space-y-0.5">
          <Link
            href="/homework"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-[6px] rounded-md text-[13px] transition-colors ${
              pathname.startsWith('/homework')
                ? 'bg-white/[0.08] text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <FileText className="h-3.5 w-3.5 opacity-50" />
            Homework
          </Link>
          <Link
            href="/exams"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-[6px] rounded-md text-[13px] transition-colors ${
              pathname.startsWith('/exams')
                ? 'bg-white/[0.08] text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5 opacity-50" />
            Past Exams
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/[0.06] text-[11px] text-slate-600">
        Queen&apos;s University
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg border border-white/10"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[#0c1220] transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-60 bg-[#0c1220] z-20 border-r border-white/[0.04]">
        {nav}
      </aside>

      {/* Global search dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
