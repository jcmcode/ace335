'use client'

import { useState, useEffect, useMemo } from 'react'

const W = 320
const H = 320

// f(x,y) = x^2 + 2*y^2 (elliptic bowl — nice contours)
const f = (x: number, y: number) => x * x + 2 * y * y
const grad = (x: number, y: number) => [2 * x, 4 * y]

export default function GradientContour() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [hoverPt, setHoverPt] = useState<{ x: number; y: number } | null>(null)

  const xToScreen = (x: number) => (W / 2) + (x * (W / 2) / 2.5)
  const yToScreen = (y: number) => (H / 2) - (y * (H / 2) / 2.5)

  // Contour levels
  const contourPaths = useMemo(() => {
    const levels = [0.2, 0.5, 1, 2, 3.5, 5.5]
    return levels.map(level => {
      // Ellipse: x^2 + 2y^2 = level -> a = sqrt(level), b = sqrt(level/2)
      const a = Math.sqrt(level)
      const b = Math.sqrt(level / 2)
      const pts: string[] = []
      for (let i = 0; i <= 100; i++) {
        const theta = (i / 100) * 2 * Math.PI
        const x = a * Math.cos(theta)
        const y = b * Math.sin(theta)
        pts.push(`${(W / 2) + (x * (W / 2) / 2.5)},${(H / 2) - (y * (H / 2) / 2.5)}`)
      }
      return { level, points: pts.join(' ') }
    })
  }, [])

  // Gradient arrows on a grid
  const gradArrows = useMemo(() => {
    const arrows: { x1: number; y1: number; x2: number; y2: number }[] = []
    const xs = (x: number) => (W / 2) + (x * (W / 2) / 2.5)
    const ys = (y: number) => (H / 2) - (y * (H / 2) / 2.5)
    for (let i = -2; i <= 2; i += 1) {
      for (let j = -2; j <= 2; j += 1) {
        if (Math.abs(i) < 0.5 && Math.abs(j) < 0.5) continue
        const [gx, gy] = grad(i, j)
        const mag = Math.sqrt(gx * gx + gy * gy)
        if (mag === 0) continue
        const scale = 0.3 / Math.max(mag, 1)
        const ex = i + gx * scale
        const ey = j + gy * scale
        arrows.push({
          x1: xs(i),
          y1: ys(j),
          x2: xs(ex),
          y2: ys(ey),
        })
      }
    }
    return arrows
  }, [])

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-96" />

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const sx = ((e.clientX - rect.left) / rect.width) * W
    const sy = ((e.clientY - rect.top) / rect.height) * H
    const x = (sx - W / 2) / ((W / 2) / 2.5)
    const y = -(sy - H / 2) / ((H / 2) / 2.5)
    if (Math.abs(x) <= 2.5 && Math.abs(y) <= 2.5) {
      setHoverPt({ x, y })
    } else {
      setHoverPt(null)
    }
  }

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">The Gradient: Direction of Steepest Ascent</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Contour plot of f(x,y) = x² + 2y². The arrows show ∇f — at every point, the gradient is perpendicular to the level curve through that point and points in the direction of steepest ascent. Hover to see values.
        </p>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full sm:w-1/2 flex-shrink-0"
          style={{ maxHeight: 360 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverPt(null)}
        >
          {/* Grid */}
          {[-2, -1, 1, 2].map(v => (
            <g key={v}>
              <line x1={xToScreen(v)} y1={0} x2={xToScreen(v)} y2={H} stroke="#f1f5f9" strokeWidth="0.5" />
              <line x1={0} y1={yToScreen(v)} x2={W} y2={yToScreen(v)} stroke="#f1f5f9" strokeWidth="0.5" />
            </g>
          ))}
          {/* Axes */}
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#cbd5e1" strokeWidth="0.5" />
          <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#cbd5e1" strokeWidth="0.5" />

          {/* Contour ellipses */}
          {contourPaths.map((c, i) => (
            <g key={c.level}>
              <polyline points={c.points} fill="none" stroke="#6366f1" strokeWidth="1" opacity={0.3 + i * 0.1} />
            </g>
          ))}

          {/* Gradient arrows */}
          {gradArrows.map((a, i) => (
            <g key={i}>
              <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#dc2626" strokeWidth="1.2" markerEnd="url(#gradArrow)" />
            </g>
          ))}

          <defs>
            <marker id="gradArrow" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
              <path d="M 0 0 L 5 2 L 0 4 Z" fill="#dc2626" />
            </marker>
          </defs>

          {/* Hover point */}
          {hoverPt && (
            <>
              <circle cx={xToScreen(hoverPt.x)} cy={yToScreen(hoverPt.y)} r="4" fill="#0f172a" />
              {(() => {
                const [gx, gy] = grad(hoverPt.x, hoverPt.y)
                const mag = Math.sqrt(gx * gx + gy * gy)
                if (mag < 0.01) return null
                const s = 0.5
                return (
                  <line
                    x1={xToScreen(hoverPt.x)} y1={yToScreen(hoverPt.y)}
                    x2={xToScreen(hoverPt.x + gx * s / Math.max(mag, 1))}
                    y2={yToScreen(hoverPt.y + gy * s / Math.max(mag, 1))}
                    stroke="#f59e0b" strokeWidth="2" markerEnd="url(#gradArrow)"
                  />
                )
              })()}
            </>
          )}

          <text x={W - 12} y={H / 2 - 5} fontSize="9" fill="#64748b" textAnchor="end">x</text>
          <text x={W / 2 + 5} y={10} fontSize="9" fill="#64748b">y</text>
        </svg>

        <div className="flex-1 space-y-3 text-[12px] text-slate-600">
          <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
            <p><strong>f(x, y) = x² + 2y²</strong></p>
            <p>∇f(x, y) = (2x, 4y)</p>
            {hoverPt && (
              <div className="pt-2 border-t border-slate-200 mt-2">
                <p>At ({hoverPt.x.toFixed(2)}, {hoverPt.y.toFixed(2)}):</p>
                <p>f = {f(hoverPt.x, hoverPt.y).toFixed(3)}</p>
                <p>∇f = ({grad(hoverPt.x, hoverPt.y)[0].toFixed(2)}, {grad(hoverPt.x, hoverPt.y)[1].toFixed(2)})</p>
              </div>
            )}
          </div>
          <p><span className="inline-block w-3 h-0.5 bg-indigo-500 align-middle mr-1" /> Level curves of f</p>
          <p><span className="inline-block w-3 h-0.5 bg-red-500 align-middle mr-1" /> Gradient field ∇f</p>
          <p><span className="inline-block w-3 h-0.5 bg-amber-400 align-middle mr-1" /> Gradient at hover point</p>
          <p className="text-[11px] text-slate-500 italic mt-2">
            Key property: ∇f ⊥ level curve. Walking along a contour keeps f constant; walking in the direction of ∇f raises f fastest.
          </p>
        </div>
      </div>
    </div>
  )
}
