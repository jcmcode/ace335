'use client'

import { useState, useMemo, useEffect } from 'react'

const CX = 120
const CY = 120
const R = 80

export default function NormBalls() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [p, setP] = useState(2)

  // Generate unit ball boundary for Lp norm
  const ballPoints = useMemo(() => {
    const pts: string[] = []
    const N = 200
    for (let i = 0; i <= N; i++) {
      const theta = (i / N) * 2 * Math.PI
      let x: number, y: number

      if (p >= 100) {
        // L-infinity: square
        const ct = Math.cos(theta)
        const st = Math.sin(theta)
        const scale = 1 / Math.max(Math.abs(ct), Math.abs(st))
        x = ct * scale
        y = st * scale
      } else {
        // |x|^p + |y|^p = 1
        const ct = Math.cos(theta)
        const st = Math.sin(theta)
        const absCt = Math.abs(ct)
        const absSt = Math.abs(st)
        const scale = Math.pow(Math.pow(absCt, p) + Math.pow(absSt, p), -1 / p)
        x = ct * scale
        y = st * scale
      }

      pts.push(`${CX + x * R},${CY - y * R}`)
    }
    return pts.join(' ')
  }, [p])

  const pLabel = p >= 100 ? '\\infty' : p === 1 ? '1' : p === 2 ? '2' : p.toFixed(1)
  const pDisplay = p >= 100 ? 'inf' : p.toFixed(1)

  const presets = [
    { val: 0.5, label: '0.5' },
    { val: 1, label: '1' },
    { val: 2, label: '2' },
    { val: 5, label: '5' },
    { val: 100, label: 'inf' },
  ]

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">What the &quot;Unit Ball&quot; Looks Like Under Different Norms</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Each norm defines a different shape for &quot;all points of distance 1 from the origin.&quot; Drag the slider to see how the unit ball morphs as p changes -- from a diamond (p=1) to a circle (p=2) to a square (p=infinity).
        </p>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
        <svg viewBox={`0 0 ${CX * 2} ${CY * 2}`} className="w-full sm:w-1/2 flex-shrink-0" style={{ maxHeight: 260 }}>
          {/* Grid */}
          <line x1={CX} y1={10} x2={CX} y2={CY * 2 - 10} stroke="#f1f5f9" strokeWidth="0.5" />
          <line x1={10} y1={CY} x2={CX * 2 - 10} y2={CY} stroke="#f1f5f9" strokeWidth="0.5" />

          {/* Grid lines */}
          {[-1, -0.5, 0.5, 1].map(v => (
            <g key={v}>
              <line x1={CX + v * R} y1={10} x2={CX + v * R} y2={CY * 2 - 10} stroke="#f8fafc" strokeWidth="0.5" />
              <line x1={10} y1={CY - v * R} x2={CX * 2 - 10} y2={CY - v * R} stroke="#f8fafc" strokeWidth="0.5" />
            </g>
          ))}

          {/* Axes */}
          <line x1={CX} y1={10} x2={CX} y2={CY * 2 - 10} stroke="#cbd5e1" strokeWidth="1" />
          <line x1={10} y1={CY} x2={CX * 2 - 10} y2={CY} stroke="#cbd5e1" strokeWidth="1" />

          {/* Tick marks */}
          {[-1, 1].map(v => (
            <g key={v}>
              <line x1={CX + v * R} y1={CY - 3} x2={CX + v * R} y2={CY + 3} stroke="#94a3b8" strokeWidth="1" />
              <text x={CX + v * R} y={CY + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{v}</text>
              <line x1={CX - 3} y1={CY - v * R} x2={CX + 3} y2={CY - v * R} stroke="#94a3b8" strokeWidth="1" />
              <text x={CX - 10} y={CY - v * R + 3} textAnchor="end" fontSize="9" fill="#94a3b8">{v}</text>
            </g>
          ))}

          {/* Unit ball */}
          <polygon
            points={ballPoints}
            fill="#6366f1"
            fillOpacity="0.12"
            stroke="#6366f1"
            strokeWidth="2"
          />

          {/* Labels */}
          <text x={CX * 2 - 14} y={CY - 6} fontSize="10" fill="#64748b" fontStyle="italic">x₁</text>
          <text x={CX + 6} y={18} fontSize="10" fill="#64748b" fontStyle="italic">x₂</text>
        </svg>

        <div className="flex-1 space-y-4">
          <div>
            <div className="text-[12px] font-medium text-slate-500 mb-2">
              p = {pDisplay}
            </div>
            <input
              type="range"
              min={0.3}
              max={100}
              step={0.1}
              value={p}
              onChange={e => setP(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {presets.map(pr => (
              <button
                key={pr.val}
                onClick={() => setP(pr.val)}
                className={`px-3 py-1 text-[12px] font-medium rounded-md border transition-colors ${
                  Math.abs(p - pr.val) < 0.05
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                p = {pr.label}
              </button>
            ))}
          </div>

          <div className="text-[12px] text-slate-500 space-y-1">
            <p><strong>p {'<'} 1:</strong> Non-convex, not a true norm</p>
            <p><strong>p = 1:</strong> Diamond (taxicab/Manhattan)</p>
            <p><strong>p = 2:</strong> Circle (Euclidean)</p>
            <p><strong>p &gt; 2:</strong> Approaches square</p>
            <p><strong>p = inf:</strong> Square (max norm)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
