'use client'

import { useState, useEffect, useMemo } from 'react'

const W = 420
const H = 180
const PAD = 30

// f(x) = x^2 on [0, 2]
const f = (x: number) => x * x
const exactIntegral = 8 / 3

export default function DarbouxSums() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [n, setN] = useState(6)

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-80" />

  const xToScreen = (x: number) => PAD + (x / 2) * (W - 2 * PAD)
  const yToScreen = (y: number) => H - PAD - (y / 4) * (H - 2 * PAD)

  const { lowerRects, upperRects, lowerSum, upperSum } = useMemo(() => {
    const lr = []
    const ur = []
    let ls = 0, us = 0
    const dx = 2 / n
    for (let i = 0; i < n; i++) {
      const xl = i * dx
      const xr = (i + 1) * dx
      // f is increasing on [0,2], so inf = f(xl), sup = f(xr)
      const low = f(xl)
      const high = f(xr)
      lr.push({ x: xToScreen(xl), y: yToScreen(low), w: xToScreen(xr) - xToScreen(xl), h: yToScreen(0) - yToScreen(low) })
      ur.push({ x: xToScreen(xl), y: yToScreen(high), w: xToScreen(xr) - xToScreen(xl), h: yToScreen(0) - yToScreen(high) })
      ls += low * dx
      us += high * dx
    }
    return { lowerRects: lr, upperRects: ur, lowerSum: ls, upperSum: us }
  }, [n])

  const curvePoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 2
      pts.push(`${xToScreen(x)},${yToScreen(f(x))}`)
    }
    return pts.join(' ')
  }, [])

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Darboux Sums: Squeezing the Integral</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          The lower sum (green) underestimates ∫f, the upper sum (red) overestimates. As you refine the partition, they squeeze toward the true value. A function is Riemann integrable iff this squeeze works — i.e., upper − lower can be made arbitrarily small.
        </p>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="text-[12px] font-medium text-slate-500 block mb-1">
            n = {n} (number of subintervals)
          </label>
          <input
            type="range" min={2} max={40} step={1} value={n}
            onChange={e => setN(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 220 }}>
          {/* Upper rectangles (red, drawn first so lower sits on top) */}
          {upperRects.map((r, i) => (
            <rect key={`u-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="#f87171" fillOpacity="0.25" stroke="#dc2626" strokeWidth="0.4" />
          ))}
          {/* Lower rectangles (green) */}
          {lowerRects.map((r, i) => (
            <rect key={`l-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="#34d399" fillOpacity="0.4" stroke="#059669" strokeWidth="0.4" />
          ))}

          {/* Axes */}
          <line x1={PAD} y1={yToScreen(0)} x2={W - PAD} y2={yToScreen(0)} stroke="#334155" strokeWidth="1" />
          <line x1={PAD} y1={PAD / 2} x2={PAD} y2={yToScreen(0)} stroke="#334155" strokeWidth="1" />

          {/* Function */}
          <polyline points={curvePoints} fill="none" stroke="#0f172a" strokeWidth="2" />

          {/* Labels */}
          <text x={xToScreen(0)} y={yToScreen(0) + 12} fontSize="9" fill="#334155" textAnchor="middle">0</text>
          <text x={xToScreen(2)} y={yToScreen(0) + 12} fontSize="9" fill="#334155" textAnchor="middle">2</text>
          <text x={xToScreen(1)} y={yToScreen(f(1)) - 8} fontSize="10" fill="#0f172a">f(x) = x²</text>
        </svg>

        <div className="grid grid-cols-3 gap-3 text-[12px]">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700">Lower Sum</div>
            <div className="text-lg font-semibold text-emerald-800 mt-1">{lowerSum.toFixed(3)}</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-700">Exact ∫₀² x²dx</div>
            <div className="text-lg font-semibold text-slate-800 mt-1">8/3 = {exactIntegral.toFixed(3)}</div>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-rose-700">Upper Sum</div>
            <div className="text-lg font-semibold text-rose-800 mt-1">{upperSum.toFixed(3)}</div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          Gap = U − L = {(upperSum - lowerSum).toFixed(3)} → 0 as n → ∞
        </p>
      </div>
    </div>
  )
}
