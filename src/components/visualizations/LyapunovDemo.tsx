'use client'

import { useState, useMemo, useEffect } from 'react'

const W = 280
const H = 280
const CX = W / 2
const CY = H / 2

export default function LyapunovDemo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  // System: dx/dt = -x, dy/dt = -2y (stable node)
  // Lyapunov function V(x,y) = x^2 + y^2 (level curves are ellipses)

  const levelCurves = useMemo(() => {
    const curves: { points: string; level: number }[] = []
    const levels = [0.3, 0.6, 1.0, 1.5, 2.0, 2.5]

    for (const r of levels) {
      const pts: string[] = []
      for (let i = 0; i <= 100; i++) {
        const theta = (i / 100) * 2 * Math.PI
        const x = r * Math.cos(theta)
        const y = r * Math.sin(theta) * 0.7 // squeeze for the 2y term
        pts.push(`${CX + x * 80},${CY - y * 80}`)
      }
      curves.push({ points: pts.join(' '), level: r })
    }
    return curves
  }, [])

  // Trajectories
  const trajectories = useMemo(() => {
    const trajs: string[][] = []
    const starts = [
      [2, 1], [-1.5, 2], [2, -1.5], [-2, -1], [0.5, 2.5], [-2.5, 0.5],
      [1, -2], [-1, -2.5],
    ]

    for (const [x0, y0] of starts) {
      const pts: string[] = []
      let x = x0, y = y0
      const dt = 0.03

      for (let t = 0; t < 4; t += dt) {
        const sx = CX + x * 80
        const sy = CY - y * 80 * 0.7
        if (sx > 0 && sx < W && sy > 0 && sy < H) {
          pts.push(`${sx},${sy}`)
        }
        // dx/dt = -x, dy/dt = -2y
        x += -x * dt
        y += -2 * y * dt
      }
      trajs.push(pts)
    }
    return trajs
  }, [])

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Lyapunov Stability Visualization</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Level curves of V(x) = x&sup2; + y&sup2; decrease along system trajectories, proving stability
        </p>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full sm:w-1/2 flex-shrink-0" style={{ maxHeight: 300 }}>
          {/* Axes */}
          <line x1={CX} y1={10} x2={CX} y2={H - 10} stroke="#e2e8f0" strokeWidth="0.5" />
          <line x1={10} y1={CY} x2={W - 10} y2={CY} stroke="#e2e8f0" strokeWidth="0.5" />

          {/* Level curves */}
          {levelCurves.map((c, i) => (
            <polyline
              key={i}
              points={c.points}
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.8"
              opacity={0.3 + i * 0.1}
            />
          ))}

          {/* Trajectories */}
          {trajectories.map((pts, i) => (
            <polyline
              key={i}
              points={pts.join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              opacity="0.7"
            />
          ))}

          {/* Arrows on trajectories (at midpoint) */}
          {trajectories.map((pts, i) => {
            if (pts.length < 20) return null
            const mid = Math.floor(pts.length * 0.3)
            const p = pts[mid].split(',').map(Number)
            return (
              <circle key={`dot-${i}`} cx={p[0]} cy={p[1]} r="2" fill="#10b981" />
            )
          })}

          {/* Origin dot */}
          <circle cx={CX} cy={CY} r="4" fill="#6366f1" stroke="white" strokeWidth="1.5" />

          {/* Labels */}
          <text x={W - 14} y={CY - 6} fontSize="10" fill="#64748b" fontStyle="italic">x₁</text>
          <text x={CX + 6} y={18} fontSize="10" fill="#64748b" fontStyle="italic">x₂</text>
          <text x={CX + 6} y={CY + 14} fontSize="9" fill="#6366f1" fontWeight="600">0</text>
        </svg>

        <div className="flex-1 space-y-3 text-[12px] text-slate-600">
          <div className="bg-slate-50 rounded-lg p-3 space-y-2">
            <p className="font-medium text-slate-700">System: dx/dt = Ax</p>
            <p>A = diag(-1, -2) — stable, all eigenvalues negative</p>
            <p className="mt-2"><span className="text-indigo-500 font-medium">Ellipses</span> = level curves of V(x) = x&#x27;Px</p>
            <p><span className="text-emerald-500 font-medium">Curves</span> = system trajectories</p>
          </div>
          <p>
            Every trajectory crosses level curves inward (toward the origin). This means V decreases along trajectories — exactly what Lyapunov&#x27;s theorem requires.
          </p>
          <p>
            The sublevel sets of V serve as provable regions of attraction.
          </p>
        </div>
      </div>
    </div>
  )
}
