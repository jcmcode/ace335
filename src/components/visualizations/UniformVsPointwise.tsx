'use client'

import { useState, useEffect, useMemo } from 'react'

const W = 440
const H = 160
const PAD = 30

export default function UniformVsPointwise() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [n, setN] = useState(5)
  // f_n(x) = x^n on [0, 1]. Pointwise limit is 0 for x in [0,1) and 1 at x=1.
  // Not uniform because the "corner" stays — f_n(1 - 1/n) = (1 - 1/n)^n → 1/e
  const xToScreen = (x: number) => PAD + x * (W - 2 * PAD)
  const yToScreen = (y: number) => H - PAD - y * (H - 2 * PAD)

  const fnPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const x = i / 200
      const y = Math.pow(x, n)
      pts.push(`${xToScreen(x)},${yToScreen(y)}`)
    }
    return pts.join(' ')
  }, [n])

  // Limit function (piecewise): 0 on [0,1), 1 at 1
  const limitPoints = `${xToScreen(0)},${yToScreen(0)} ${xToScreen(0.999)},${yToScreen(0)}`

  // The "worst gap" point: x where |f_n(x) - f(x)| is large
  // At x = (0.5)^{1/n}, f_n(x) = 0.5 while limit is 0 -> gap of 0.5
  const worstX = Math.pow(0.5, 1 / n)
  const worstY = 0.5


  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-80" />
  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Pointwise vs Uniform Convergence: fₙ(x) = xⁿ on [0,1]</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          The sequence converges pointwise to f(x) = 0 on [0,1) and f(1) = 1. But no matter how large n gets, there is always a point where fₙ is 1/2 — so convergence is NOT uniform, and the limit is discontinuous even though each fₙ is continuous.
        </p>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <label className="text-[12px] font-medium text-slate-500 block mb-1">n = {n}</label>
          <input
            type="range" min={1} max={100} step={1} value={n}
            onChange={e => setN(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
          {/* Axes */}
          <line x1={PAD} y1={yToScreen(0)} x2={W - PAD} y2={yToScreen(0)} stroke="#cbd5e1" strokeWidth="1" />
          <line x1={PAD} y1={PAD / 2} x2={PAD} y2={yToScreen(0)} stroke="#cbd5e1" strokeWidth="1" />
          <text x={xToScreen(1)} y={yToScreen(0) + 12} fontSize="9" fill="#64748b">1</text>
          <text x={PAD - 4} y={yToScreen(1) + 3} fontSize="9" fill="#64748b" textAnchor="end">1</text>
          <text x={PAD - 4} y={yToScreen(0.5) + 3} fontSize="9" fill="#64748b" textAnchor="end">1/2</text>

          {/* Target limit function (discontinuous): 0 on [0,1), dot at (1,1) */}
          <polyline points={limitPoints} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
          <circle cx={xToScreen(1)} cy={yToScreen(1)} r="3" fill="#64748b" />
          <circle cx={xToScreen(1)} cy={yToScreen(0)} r="2.5" fill="none" stroke="#64748b" strokeWidth="1" />

          {/* f_n itself */}
          <polyline points={fnPoints} fill="none" stroke="#6366f1" strokeWidth="2" />

          {/* Mark the "worst gap" — a half-gap that never goes away */}
          <line x1={xToScreen(worstX)} y1={yToScreen(0)} x2={xToScreen(worstX)} y2={yToScreen(worstY)} stroke="#dc2626" strokeWidth="1" strokeDasharray="3,2" />
          <circle cx={xToScreen(worstX)} cy={yToScreen(worstY)} r="3" fill="#dc2626" />
          <text x={xToScreen(worstX) + 6} y={yToScreen(worstY) + 4} fontSize="9" fill="#991b1b" fontWeight="600">
            gap = 1/2
          </text>
        </svg>

        <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600 space-y-1.5">
          <p><span className="inline-block w-3 h-0.5 bg-indigo-500 align-middle mr-1" /> <strong>fₙ(x) = xⁿ</strong> — continuous for every n</p>
          <p><span className="inline-block w-3 h-0.5 bg-slate-400 align-middle mr-1" style={{ borderTop: '1.5px dashed' }} /> <strong>Pointwise limit</strong> — 0 on [0,1), jumps to 1 at x = 1 (discontinuous!)</p>
          <p><span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full align-middle mr-1" /> <strong>Sup-norm gap:</strong> sup|fₙ − f| = 1 for every n. Pointwise ✓, uniform ✗.</p>
        </div>
      </div>
    </div>
  )
}
