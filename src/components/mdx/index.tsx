'use client'

import { ReactNode, useState } from 'react'

interface BoxProps {
  id?: string
  title?: string
  children: ReactNode
}

function MathBox({
  label,
  id,
  title,
  accent,
  children,
}: BoxProps & { label: string; accent: string }) {
  return (
    <div id={id} className={`my-8 rounded-lg border ${accent} overflow-hidden`}>
      <div className={`px-4 py-2 border-b ${accent}`}>
        <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
          {label}
        </span>
        {title && (
          <span className="text-sm font-medium ml-2 opacity-90">
            {title}
          </span>
        )}
      </div>
      <div className="px-5 py-4 text-[15px] leading-relaxed">{children}</div>
    </div>
  )
}

export function Definition({ id, title, children }: BoxProps) {
  return (
    <MathBox
      label={id ? `Definition ${id}` : 'Definition'}
      id={id ? `def-${id}` : undefined}
      title={title}
      accent="border-sky-200 bg-sky-50/60 text-sky-950 [&>div:first-child]:bg-sky-100/80 [&>div:first-child]:text-sky-800 [&>div:first-child]:border-sky-200"
    >
      {children}
    </MathBox>
  )
}

export function Theorem({ id, title, children }: BoxProps) {
  return (
    <MathBox
      label={id ? `Theorem ${id}` : 'Theorem'}
      id={id ? `thm-${id}` : undefined}
      title={title}
      accent="border-emerald-200 bg-emerald-50/60 text-emerald-950 [&>div:first-child]:bg-emerald-100/80 [&>div:first-child]:text-emerald-800 [&>div:first-child]:border-emerald-200"
    >
      {children}
    </MathBox>
  )
}

export function Lemma({ id, title, children }: BoxProps) {
  return (
    <MathBox
      label={id ? `Lemma ${id}` : 'Lemma'}
      id={id ? `lem-${id}` : undefined}
      title={title}
      accent="border-amber-200 bg-amber-50/60 text-amber-950 [&>div:first-child]:bg-amber-100/80 [&>div:first-child]:text-amber-800 [&>div:first-child]:border-amber-200"
    >
      {children}
    </MathBox>
  )
}

export function Corollary({ id, title, children }: BoxProps) {
  return (
    <MathBox
      label={id ? `Corollary ${id}` : 'Corollary'}
      id={id ? `cor-${id}` : undefined}
      title={title}
      accent="border-violet-200 bg-violet-50/60 text-violet-950 [&>div:first-child]:bg-violet-100/80 [&>div:first-child]:text-violet-800 [&>div:first-child]:border-violet-200"
    >
      {children}
    </MathBox>
  )
}

export function Proposition({ id, title, children }: BoxProps) {
  return (
    <MathBox
      label={id ? `Proposition ${id}` : 'Proposition'}
      id={id ? `prop-${id}` : undefined}
      title={title}
      accent="border-indigo-200 bg-indigo-50/60 text-indigo-950 [&>div:first-child]:bg-indigo-100/80 [&>div:first-child]:text-indigo-800 [&>div:first-child]:border-indigo-200"
    >
      {children}
    </MathBox>
  )
}

export function Proof({ title, children }: { title?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="my-5">
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        <svg
          className={`w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M4.5 2l5 4-5 4V2z" />
        </svg>
        <span className="italic">{title || 'Proof'}</span>
      </button>
      {open && (
        <div className="mt-3 ml-1.5 pl-5 border-l-2 border-slate-200 text-[15px] leading-relaxed text-slate-700 animate-in fade-in duration-150">
          {children}
          <div className="text-right mt-3 text-slate-400 select-none text-lg leading-none">&#8718;</div>
        </div>
      )}
    </div>
  )
}

export function Example({ id, title, children }: BoxProps) {
  return (
    <div id={id ? `ex-${id}` : undefined} className="my-8 rounded-lg border border-teal-200 bg-teal-50/40 overflow-hidden">
      <div className="px-4 py-2 border-b border-teal-200 bg-teal-100/60">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
          {id ? `Example ${id}` : 'Example'}
        </span>
        {title && (
          <span className="text-sm font-medium ml-2 text-teal-800">{title}</span>
        )}
      </div>
      <div className="px-5 py-4 text-[15px] leading-relaxed text-teal-950">{children}</div>
    </div>
  )
}

export function Remark({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div id={id ? `rem-${id}` : undefined} className="my-6 flex gap-3 text-[14px] text-slate-500 leading-relaxed">
      <span className="shrink-0 font-semibold text-slate-400 italic text-[13px]">
        Remark{id ? ` ${id}` : ''}.
      </span>
      <div className="italic">{children}</div>
    </div>
  )
}

export function Solution({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="my-5">
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
      >
        <svg
          className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M4.5 2l5 4-5 4V2z" />
        </svg>
        {open ? 'Hide Solution' : 'Show Solution'}
      </button>
      {open && (
        <div className="mt-3 ml-1.5 pl-5 border-l-2 border-indigo-200 text-[15px] leading-relaxed text-slate-700">
          {children}
        </div>
      )}
    </div>
  )
}

export function Problem({ id, title, children }: BoxProps) {
  return (
    <div id={id ? `prob-${id}` : undefined} className="my-8 rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {id ? `Problem ${id}` : 'Problem'}
        </span>
        {title && (
          <span className="text-sm font-medium ml-2 text-slate-800">{title}</span>
        )}
      </div>
      <div className="px-5 py-4 text-[15px] leading-relaxed text-slate-800">{children}</div>
    </div>
  )
}
