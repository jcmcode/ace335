'use client'

import { useState, useEffect, useMemo } from 'react'

const W = 300
const H = 300

export default function LagrangeDemo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [c, setC] = useState(1.4) // level of f(x,y) = x + y

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-80" />

  const xToScreen = (x: number) => W / 2 + x * 80
  const yToScreen = (y: number) => H / 2 - y * 80

  // Constraint: x^2 + y^2 = 1 (unit circle)
  const circlePoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 100; i++) {
      const theta = (i / 100) * 2 * Math.PI
      pts.push(`${xToScreen(Math.cos(theta))},${yToScreen(Math.sin(theta))}`)
    }
    return pts.join(' ')
  }, [])

  // Level curve: x + y = c (a line)
  const lineStart = { x: c - 2, y: 2 }
  const lineEnd = { x: c + 2, y: -2 }

  // Optimum: (1/sqrt(2), 1/sqrt(2)) for max, gives c = sqrt(2)
  const cMax = Math.sqrt(2)
  const touching = Math.abs(c - cMax) < 0.05 || Math.abs(c + cMax) < 0.05

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Lagrange Multipliers: Level Curves Kissing the Constraint</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Maximize f(x,y) = x + y subject to x² + y² = 1. Move the slider to slide the level curve x + y = c. At the maximum, the level line is <strong>tangent</strong> to the constraint — meaning ∇f and ∇g are parallel.
        </p>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="text-[12px] font-medium text-slate-500 block mb-1">
            c = {c.toFixed(2)} &nbsp; <span className="text-slate-400">(f(x,y) value)</span>
          </label>
          <input
            type="range" min={-1.8} max={1.8} step={0.01} value={c}
            onChange={e => setC(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5 items-center">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full flex-shrink-0" style={{ maxHeight: 320 }}>
            {/* Grid */}
            <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#e5e7eb" strokeWidth="0.5" />
            <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#e5e7eb" strokeWidth="0.5" />

            {/* Constraint circle */}
            <polyline points={circlePoints} fill="none" stroke="#059669" strokeWidth="2" />
            <text x={W / 2 + 60} y={H / 2 - 70} fontSize="11" fill="#047857" fontWeight="600">g = 0</text>

            {/* Level line: x + y = c -> y = c - x */}
            <line
              x1={xToScreen(lineStart.x)} y1={yToScreen(lineStart.y)}
              x2={xToScreen(lineEnd.x)} y2={yToScreen(lineEnd.y)}
              stroke={touching ? '#f59e0b' : '#6366f1'} strokeWidth="2"
            />
            <text x={W - 20} y={yToScreen(c - (c - 2)) + 4} fontSize="10" fill={touching ? '#d97706' : '#4338ca'} fontWeight="600">
              f = {c.toFixed(2)}
            </text>

            {/* Mark optimum if touching */}
            {touching && (
              <>
                <circle cx={xToScreen(Math.sign(c) / Math.sqrt(2))} cy={yToScreen(Math.sign(c) / Math.sqrt(2))} r="5" fill="#f59e0b" stroke="white" strokeWidth="2" />
                {/* Gradient arrows at optimum */}
                <line
                  x1={xToScreen(Math.sign(c) / Math.sqrt(2))} y1={yToScreen(Math.sign(c) / Math.sqrt(2))}
                  x2={xToScreen(Math.sign(c) / Math.sqrt(2) + 0.35)} y2={yToScreen(Math.sign(c) / Math.sqrt(2) + 0.35)}
                  stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#larr)"
                />
                <line
                  x1={xToScreen(Math.sign(c) / Math.sqrt(2))} y1={yToScreen(Math.sign(c) / Math.sqrt(2))}
                  x2={xToScreen(Math.sign(c) / Math.sqrt(2) + 0.5 * Math.sign(c))} y2={yToScreen(Math.sign(c) / Math.sqrt(2) + 0.5 * Math.sign(c))}
                  stroke="#059669" strokeWidth="1.5" markerEnd="url(#larr-g)"
                />
              </>
            )}

            <defs>
              <marker id="larr" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                <path d="M 0 0 L 6 2.5 L 0 5 Z" fill="#2563eb" />
              </marker>
              <marker id="larr-g" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                <path d="M 0 0 L 6 2.5 L 0 5 Z" fill="#059669" />
              </marker>
            </defs>

            <text x={W - 10} y={H / 2 + 12} fontSize="9" fill="#94a3b8">x</text>
            <text x={W / 2 + 4} y={10} fontSize="9" fill="#94a3b8">y</text>
          </svg>

          <div className="space-y-2 text-[12px] text-slate-600">
            <div className={`rounded-lg p-3 text-[12px] ${touching ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50'}`}>
              {touching ? (
                <>
                  <p className="font-semibold text-amber-700">Lagrange condition satisfied!</p>
                  <p className="mt-1">∇f = ({c > 0 ? '1,1' : '1,1'}) is parallel to ∇g = ({(c > 0 ? 1 : -1) * 2 / Math.sqrt(2)}, {(c > 0 ? 1 : -1) * 2 / Math.sqrt(2)}).</p>
                  <p className="mt-1">λ = {c > 0 ? (1 / (2 / Math.sqrt(2))).toFixed(3) : (1 / (-2 / Math.sqrt(2))).toFixed(3)} is the Lagrange multiplier.</p>
                </>
              ) : c > cMax || c < -cMax ? (
                <p className="text-slate-500">The level line doesn&apos;t meet the circle — f cannot reach this value under the constraint.</p>
              ) : (
                <p className="text-slate-500">The level line crosses the constraint at two points. Slide until it just touches tangentially to find the extremum.</p>
              )}
            </div>

            <div className="space-y-1">
              <p><span className="inline-block w-3 h-0.5 bg-emerald-600 align-middle mr-1" /> Constraint g(x,y) = x² + y² − 1 = 0</p>
              <p><span className="inline-block w-3 h-0.5 align-middle mr-1" style={{ backgroundColor: touching ? '#f59e0b' : '#6366f1' }} /> Level curve f(x,y) = c</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
