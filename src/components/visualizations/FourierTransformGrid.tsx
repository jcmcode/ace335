'use client'

import { useState, useEffect } from 'react'

const transforms = [
  {
    name: 'DDFT',
    full: 'Discrete-to-Discrete',
    timeLabel: 'Discrete',
    freqLabel: 'Discrete',
    formula: 'x(n) → X(k/N)',
    desc: 'Finite-length sequences ↔ finite-length spectra',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    name: 'DCFT',
    full: 'Discrete-to-Continuous',
    timeLabel: 'Discrete',
    freqLabel: 'Continuous',
    formula: 'x(n) → X(f)',
    desc: 'Sequences ↔ periodic continuous spectra',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    name: 'CDFT',
    full: 'Continuous-to-Discrete',
    timeLabel: 'Continuous',
    freqLabel: 'Discrete',
    formula: 'x(t) → X(k/P)',
    desc: 'Periodic signals ↔ discrete spectra (Fourier series)',
    color: '#10b981',
    bg: '#ecfdf5',
  },
  {
    name: 'CCFT',
    full: 'Continuous-to-Continuous',
    timeLabel: 'Continuous',
    freqLabel: 'Continuous',
    formula: 'x(t) → X(f)',
    desc: 'Aperiodic signals ↔ continuous spectra',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
]

function SignalDots({ discrete, color }: { discrete: boolean; color: string }) {
  if (discrete) {
    return (
      <svg viewBox="0 0 60 24" className="w-full h-6">
        {[8, 18, 28, 38, 48].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={20} x2={x} y2={20 - [6, 14, 18, 10, 4][i]} stroke={color} strokeWidth="1.5" />
            <circle cx={x} cy={20 - [6, 14, 18, 10, 4][i]} r="2" fill={color} />
          </g>
        ))}
        <line x1={4} y1={20} x2={52} y2={20} stroke="#e5e7eb" strokeWidth="0.5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 60 24" className="w-full h-6">
      <path
        d="M 4 18 Q 12 4, 20 12 Q 28 20, 36 8 Q 44 -2, 52 14"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line x1={4} y1={20} x2={52} y2={20} stroke="#e5e7eb" strokeWidth="0.5" />
    </svg>
  )
}

export default function FourierTransformGrid() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10">
      <div className="text-center mb-4">
        <h4 className="text-sm font-semibold text-slate-700">The Four Types of Fourier Transforms</h4>
        <p className="text-xs text-slate-400 mt-0.5">Signals can be discrete or continuous in both time and frequency. Each combination gives a different Fourier transform -- these are the four building blocks of frequency analysis.</p>
      </div>

      {/* Axis labels */}
      <div className="grid grid-cols-[auto_1fr_1fr] gap-0 max-w-xl mx-auto">
        {/* Corner */}
        <div className="flex items-end justify-end pr-2 pb-1">
          <span className="text-[10px] text-slate-400">Time \ Freq →</span>
        </div>
        {/* Freq headers */}
        <div className="text-center pb-1.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Discrete</span>
        </div>
        <div className="text-center pb-1.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Continuous</span>
        </div>

        {/* Row 1: Discrete time */}
        <div className="flex items-center justify-end pr-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">Discrete</span>
        </div>
        {[0, 1].map(i => {
          const t = transforms[i]
          return (
            <div key={t.name} className="border border-slate-200 rounded-lg m-1 p-3" style={{ backgroundColor: t.bg }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold" style={{ color: t.color }}>{t.name}</span>
                <span className="text-[10px] text-slate-400">{t.full}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <div className="text-[9px] text-slate-400 mb-0.5">Time</div>
                  <SignalDots discrete={true} color={t.color} />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 mb-0.5">Freq</div>
                  <SignalDots discrete={i === 0} color={t.color} />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">{t.desc}</p>
            </div>
          )
        })}

        {/* Row 2: Continuous time */}
        <div className="flex items-center justify-end pr-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">Continuous</span>
        </div>
        {[2, 3].map(i => {
          const t = transforms[i]
          return (
            <div key={t.name} className="border border-slate-200 rounded-lg m-1 p-3" style={{ backgroundColor: t.bg }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold" style={{ color: t.color }}>{t.name}</span>
                <span className="text-[10px] text-slate-400">{t.full}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <div className="text-[9px] text-slate-400 mb-0.5">Time</div>
                  <SignalDots discrete={false} color={t.color} />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 mb-0.5">Freq</div>
                  <SignalDots discrete={i === 2} color={t.color} />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">{t.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
