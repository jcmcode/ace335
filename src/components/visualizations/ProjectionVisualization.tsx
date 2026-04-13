'use client'

import { useState, useEffect } from 'react'

const W = 300
const H = 300
const CX = W / 2
const CY = H / 2
const SCALE = 50

export default function ProjectionVisualization() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [angle, setAngle] = useState(30) // angle of subspace from x-axis

  const rad = (angle * Math.PI) / 180

  // Vector to project
  const vx = 3
  const vy = 3.5

  // Subspace direction
  const sx = Math.cos(rad)
  const sy = Math.sin(rad)

  // Projection of v onto subspace: proj = (v·s / s·s) * s
  const dot = vx * sx + vy * sy
  const projX = dot * sx
  const projY = dot * sy

  // Error vector
  const errX = vx - projX
  const errY = vy - projY

  // Screen coordinates (y-axis flipped)
  const toScreen = (x: number, y: number) => ({
    x: CX + x * SCALE,
    y: CY - y * SCALE,
  })

  const origin = toScreen(0, 0)
  const vScreen = toScreen(vx, vy)
  const projScreen = toScreen(projX, projY)

  // Subspace line
  const sub1 = toScreen(-4 * sx, -4 * sy)
  const sub2 = toScreen(4 * sx, 4 * sy)

  // Right angle marker
  const markerSize = 8
  const eNormX = errX / Math.sqrt(errX * errX + errY * errY)
  const eNormY = errY / Math.sqrt(errX * errX + errY * errY)

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Orthogonal Projection</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          The closest point in a subspace to a given vector — minimizes the error norm
        </p>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full sm:w-1/2" style={{ maxHeight: 300 }}>
          {/* Grid */}
          {Array.from({ length: 9 }, (_, i) => i - 4).map(i => (
            <g key={i}>
              <line x1={CX + i * SCALE} y1={0} x2={CX + i * SCALE} y2={H} stroke="#f8fafc" strokeWidth="0.5" />
              <line x1={0} y1={CY + i * SCALE} x2={W} y2={CY + i * SCALE} stroke="#f8fafc" strokeWidth="0.5" />
            </g>
          ))}

          {/* Axes */}
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#e2e8f0" strokeWidth="1" />
          <line x1={CX} y1={0} x2={CX} y2={H} stroke="#e2e8f0" strokeWidth="1" />

          {/* Subspace line */}
          <line x1={sub1.x} y1={sub1.y} x2={sub2.x} y2={sub2.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6,4" />
          <text x={sub2.x + 4} y={sub2.y - 4} fontSize="10" fill="#94a3b8" fontStyle="italic">M</text>

          {/* Error vector (dashed) */}
          <line x1={projScreen.x} y1={projScreen.y} x2={vScreen.x} y2={vScreen.y} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />

          {/* Right angle marker */}
          <path
            d={`M ${projScreen.x + eNormX * markerSize + sx * markerSize} ${projScreen.y - eNormY * markerSize - sy * markerSize} L ${projScreen.x + eNormX * markerSize} ${projScreen.y - eNormY * markerSize} L ${projScreen.x + sx * markerSize} ${projScreen.y - sy * markerSize}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
          />

          {/* Original vector */}
          <line x1={origin.x} y1={origin.y} x2={vScreen.x} y2={vScreen.y} stroke="#6366f1" strokeWidth="2" markerEnd="url(#projArrow)" />

          {/* Projection vector */}
          <line x1={origin.x} y1={origin.y} x2={projScreen.x} y2={projScreen.y} stroke="#10b981" strokeWidth="2.5" markerEnd="url(#projArrowGreen)" />

          {/* Points */}
          <circle cx={vScreen.x} cy={vScreen.y} r="4" fill="#6366f1" />
          <circle cx={projScreen.x} cy={projScreen.y} r="4" fill="#10b981" />

          {/* Labels */}
          <text x={vScreen.x + 8} y={vScreen.y - 4} fontSize="12" fill="#6366f1" fontWeight="600" fontStyle="italic">x</text>
          <text x={projScreen.x + 8} y={projScreen.y + 14} fontSize="12" fill="#10b981" fontWeight="600">proj</text>
          <text x={(projScreen.x + vScreen.x) / 2 + 8} y={(projScreen.y + vScreen.y) / 2} fontSize="10" fill="#ef4444" fontStyle="italic">error</text>

          <defs>
            <marker id="projArrow" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <path d="M 0 0 L 6 2.5 L 0 5 Z" fill="#6366f1" />
            </marker>
            <marker id="projArrowGreen" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <path d="M 0 0 L 6 2.5 L 0 5 Z" fill="#10b981" />
            </marker>
          </defs>
        </svg>

        <div className="flex-1 space-y-4">
          <div>
            <div className="text-[12px] font-medium text-slate-500 mb-2">
              Subspace angle: {angle}°
            </div>
            <input
              type="range"
              min={-80}
              max={80}
              step={1}
              value={angle}
              onChange={e => setAngle(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="text-[12px] text-slate-600 space-y-2">
            <p><span className="inline-block w-3 h-0.5 bg-indigo-500 align-middle mr-1.5" /> <strong>x</strong> — vector to approximate</p>
            <p><span className="inline-block w-3 h-0.5 bg-emerald-500 align-middle mr-1.5" /> <strong>proj</strong> — closest point in subspace M</p>
            <p><span className="inline-block w-3 h-0.5 bg-red-400 align-middle mr-1.5" style={{ borderTop: '1.5px dashed' }} /> <strong>error</strong> — perpendicular to M</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600">
            <p className="font-medium text-slate-700 mb-1">Key insight:</p>
            <p>The error vector is always <strong>perpendicular</strong> to the subspace. This is exactly the <em>Projection Theorem</em> — the best approximation from a closed subspace makes the error orthogonal to that subspace.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
