'use client'

import { useState, useEffect, useMemo } from 'react'

const W = 420
const H = 260
const PAD = 35

// Function: f(x) = x^2 (classic choice)
const f = (x: number) => x * x

export default function EpsilonDelta() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [epsilon, setEpsilon] = useState(0.4)
  const [delta, setDelta] = useState(0.2)
  const a = 1  // the point we're approaching
  const L = f(a)  // the limit value

  // Coordinate system: x from 0 to 2, y from 0 to 4
  const xToScreen = (x: number) => PAD + (x / 2) * (W - 2 * PAD)
  const yToScreen = (y: number) => H - PAD - (y / 4) * (H - 2 * PAD)

  // Parabola points
  const parabolaPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const x = (i / 200) * 2
      const y = f(x)
      pts.push(`${xToScreen(x)},${yToScreen(y)}`)
    }
    return pts.join(' ')
  }, [])

  // Check if delta is "good enough": for all x in (a-delta, a+delta), |f(x) - L| < epsilon
  // For f(x) = x^2 near a=1: max deviation is max(|f(a+delta) - L|, |f(a-delta) - L|)
  const maxDev = Math.max(Math.abs(f(a + delta) - L), Math.abs(f(a - delta) - L))
  const works = maxDev <= epsilon


  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-96" />
  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-700">Epsilon-Delta Continuity of f(x) = x² at x = 1</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Adjust ε (vertical tolerance around L = 1) and then pick a δ (horizontal window around a = 1) small enough that every x in the δ-window gives an f(x) inside the ε-window.
          </p>
        </div>
        <div className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${works ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {works ? 'δ works!' : 'δ too big'}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-medium text-slate-500 block mb-1">
              ε = {epsilon.toFixed(2)} (target tolerance)
            </label>
            <input
              type="range" min={0.1} max={1.5} step={0.05} value={epsilon}
              onChange={e => setEpsilon(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
          <div>
            <label className="text-[12px] font-medium text-slate-500 block mb-1">
              δ = {delta.toFixed(2)} (your choice)
            </label>
            <input
              type="range" min={0.02} max={0.8} step={0.01} value={delta}
              onChange={e => setDelta(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 280 }}>
          {/* ε band (horizontal) */}
          <rect x={PAD} y={yToScreen(L + epsilon)} width={W - 2 * PAD} height={yToScreen(L - epsilon) - yToScreen(L + epsilon)} fill="#10b981" fillOpacity="0.15" />
          <line x1={PAD} y1={yToScreen(L + epsilon)} x2={W - PAD} y2={yToScreen(L + epsilon)} stroke="#059669" strokeWidth="1" strokeDasharray="4,3" />
          <line x1={PAD} y1={yToScreen(L - epsilon)} x2={W - PAD} y2={yToScreen(L - epsilon)} stroke="#059669" strokeWidth="1" strokeDasharray="4,3" />
          <text x={W - PAD - 4} y={yToScreen(L + epsilon) - 3} fontSize="9" fill="#065f46" textAnchor="end">L + ε</text>
          <text x={W - PAD - 4} y={yToScreen(L - epsilon) - 3} fontSize="9" fill="#065f46" textAnchor="end">L − ε</text>

          {/* δ band (vertical) */}
          <rect x={xToScreen(a - delta)} y={PAD / 2} width={xToScreen(a + delta) - xToScreen(a - delta)} height={H - PAD - PAD / 2} fill={works ? '#6366f1' : '#f43f5e'} fillOpacity="0.12" />
          <line x1={xToScreen(a - delta)} y1={PAD / 2} x2={xToScreen(a - delta)} y2={H - PAD} stroke={works ? '#4338ca' : '#be123c'} strokeWidth="1" strokeDasharray="4,3" />
          <line x1={xToScreen(a + delta)} y1={PAD / 2} x2={xToScreen(a + delta)} y2={H - PAD} stroke={works ? '#4338ca' : '#be123c'} strokeWidth="1" strokeDasharray="4,3" />

          {/* Axes */}
          <line x1={PAD} y1={yToScreen(0)} x2={W - PAD} y2={yToScreen(0)} stroke="#94a3b8" strokeWidth="1" />
          <line x1={xToScreen(0)} y1={PAD / 2} x2={xToScreen(0)} y2={yToScreen(0)} stroke="#94a3b8" strokeWidth="1" />
          <text x={xToScreen(0) - 4} y={yToScreen(0) + 14} fontSize="9" fill="#94a3b8">0</text>

          {/* Function */}
          <polyline points={parabolaPoints} fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Point (a, L) */}
          <line x1={xToScreen(a)} y1={yToScreen(0)} x2={xToScreen(a)} y2={yToScreen(L)} stroke="#6b7280" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1={xToScreen(0)} y1={yToScreen(L)} x2={xToScreen(a)} y2={yToScreen(L)} stroke="#6b7280" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx={xToScreen(a)} cy={yToScreen(L)} r="4" fill="#0f172a" />

          {/* Labels */}
          <text x={xToScreen(a)} y={yToScreen(0) + 12} textAnchor="middle" fontSize="10" fill="#334155" fontWeight="600">a = 1</text>
          <text x={xToScreen(0) - 6} y={yToScreen(L) + 3} textAnchor="end" fontSize="10" fill="#334155" fontWeight="600">L = 1</text>

          {/* f(a±δ) extreme values inside the δ band */}
          <line x1={xToScreen(a - delta)} y1={yToScreen(f(a - delta))} x2={xToScreen(a + delta)} y2={yToScreen(f(a + delta))} stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx={xToScreen(a - delta)} cy={yToScreen(f(a - delta))} r="3" fill="#6366f1" />
          <circle cx={xToScreen(a + delta)} cy={yToScreen(f(a + delta))} r="3" fill="#6366f1" />
        </svg>

        <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600">
          <p className="font-medium text-slate-700 mb-1">The rule:</p>
          <p>For every ε &gt; 0, we must find a δ &gt; 0 such that whenever |x − a| &lt; δ, we have |f(x) − L| &lt; ε.</p>
          <p className="mt-1.5 text-slate-500">Equivalently: for every green band, you can pick a narrow enough purple band that its image (endpoints shown) stays inside the green band.</p>
        </div>
      </div>
    </div>
  )
}
