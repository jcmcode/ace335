'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { Search, X, BookOpen, Hash } from 'lucide-react'
import searchIndex from '@/data/search-index.json'

type SearchItem = {
  type: string
  title: string
  content: string
  chapter: string
  chapterSlug: string
  anchor: string
  level?: number
}

const typeStyles: Record<string, { badge: string; icon: string }> = {
  Definition: { badge: 'bg-sky-100 text-sky-700', icon: 'text-sky-500' },
  Theorem: { badge: 'bg-emerald-100 text-emerald-700', icon: 'text-emerald-500' },
  Lemma: { badge: 'bg-amber-100 text-amber-700', icon: 'text-amber-500' },
  Corollary: { badge: 'bg-violet-100 text-violet-700', icon: 'text-violet-500' },
  Proposition: { badge: 'bg-indigo-100 text-indigo-700', icon: 'text-indigo-500' },
  Example: { badge: 'bg-teal-100 text-teal-700', icon: 'text-teal-500' },
  Problem: { badge: 'bg-rose-100 text-rose-700', icon: 'text-rose-500' },
  Remark: { badge: 'bg-slate-100 text-slate-600', icon: 'text-slate-400' },
  Proof: { badge: 'bg-slate-100 text-slate-600', icon: 'text-slate-400' },
  Section: { badge: 'bg-slate-100 text-slate-600', icon: 'text-slate-400' },
}

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIdx, setSelectedIdx] = useState(0)

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex as SearchItem[], {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'content', weight: 1 },
          { name: 'type', weight: 0.5 },
          { name: 'chapter', weight: 0.5 },
        ],
        threshold: 0.4,
        minMatchCharLength: 2,
        includeScore: true,
      }),
    []
  )

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).slice(0, 30)
  }, [query, fuse])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10)
      setQuery('')
      setSelectedIdx(0)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx(i => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIdx(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[selectedIdx]) {
        const r = results[selectedIdx].item
        const href = buildHref(r)
        window.location.href = href
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, results, selectedIdx, onClose])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search theorems, definitions, examples..."
            className="flex-1 text-sm bg-transparent outline-none placeholder-slate-400 text-slate-800"
          />
          <kbd className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">ESC</kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!query.trim() && (
            <div className="p-8 text-center text-sm text-slate-400">
              Start typing to search across {searchIndex.length} theorems, definitions, examples, and problems.
            </div>
          )}

          {results.length > 0 && (
            <ul className="py-2">
              {results.map((result, i) => {
                const r = result.item
                const href = buildHref(r)
                const styles = typeStyles[r.type] || typeStyles.Section
                return (
                  <li key={i}>
                    <Link
                      href={href}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIdx(i)}
                      className={`flex items-start gap-3 px-4 py-2.5 text-sm transition-colors ${
                        selectedIdx === i ? 'bg-indigo-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${styles.badge}`}>
                        {r.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-800 truncate">{r.title}</div>
                        {r.content && (
                          <div className="text-[12px] text-slate-500 truncate mt-0.5">
                            {r.content}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <BookOpen className="h-2.5 w-2.5" />
                          <span>{r.chapter}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-3">
          <span><kbd className="bg-slate-100 px-1 rounded">↑↓</kbd> navigate</span>
          <span><kbd className="bg-slate-100 px-1 rounded">↵</kbd> open</span>
          <span><kbd className="bg-slate-100 px-1 rounded">esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}

function buildHref(r: SearchItem): string {
  if (r.chapterSlug.startsWith('__hw__')) {
    return `/homework/${r.chapterSlug.replace('__hw__', '')}`
  }
  return `/chapters/${r.chapterSlug}`
}
