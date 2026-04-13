'use client'

import { useState, useEffect } from 'react'

const W = 260
const H = 260
const CX = W / 2
const CY = H / 2
const R = 90

type Mode = 'continuous' | 'discrete'

export default function StabilityRegions({ mode = 'continuous' }: { mode?: Mode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [showPoles, setShowPoles] = useState(true)
  const isCT = mode === 'continuous'

  // Example pole locations
  const ctPoles = [
    { re: -1.5, im: 2, stable: true },
    { re: -1.5, im: -2, stable: true },
    { re: -0.5, im: 0, stable: true },
    { re: 0.8, im: 1, stable: false },
    { re: 0.8, im: -1, stable: false },
  ]

  const dtPoles = [
    { re: 0.3, im: 0.5, stable: true },
    { re: 0.3, im: -0.5, stable: true },
    { re: -0.6, im: 0, stable: true },
    { re: 0.9, im: 0.7, stable: false },
    { re: 0.9, im: -0.7, stable: false },
  ]

  const poles = isCT ? ctPoles : dtPoles
  const scale = isCT ? 25 : R

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">
          {isCT ? 'Continuous-Time Stability Region (s-plane)' : 'Discrete-Time Stability Region (z-plane)'}
        </h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {isCT
            ? 'Stable poles lie in the open left half-plane (Re(s) < 0)'
            : 'Stable poles lie strictly inside the unit circle (|z| < 1)'}
        </p>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full sm:w-1/2 flex-shrink-0" style={{ maxHeight: 280 }}>
          {/* Stable region */}
          {isCT ? (
            <rect x={0} y={0} width={CX} height={H} fill="#dcfce7" opacity="0.4" />
          ) : (
            <circle cx={CX} cy={CY} r={R} fill="#dcfce7" opacity="0.4" />
          )}

          {/* Unstable region label */}
          {isCT ? (
            <rect x={CX} y={0} width={CX} height={H} fill="#fef2f2" opacity="0.3" />
          ) : (
            <>
              <rect x={0} y={0} width={W} height={H} fill="#fef2f2" opacity="0.2" />
              <circle cx={CX} cy={CY} r={R} fill="#dcfce7" opacity="0.5" />
            </>
          )}

          {/* Grid */}
          <line x1={CX} y1={0} x2={CX} y2={H} stroke="#94a3b8" strokeWidth="1" />
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#94a3b8" strokeWidth="1" />

          {/* Boundary */}
          {isCT ? (
            <line x1={CX} y1={0} x2={CX} y2={H} stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />
          ) : (
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />
          )}

          {/* Labels */}
          {isCT ? (
            <>
              <text x={CX / 2} y={20} textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="600">STABLE</text>
              <text x={CX + CX / 2} y={20} textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">UNSTABLE</text>
              <text x={W - 10} y={CY - 6} fontSize="10" fill="#64748b" fontStyle="italic">Re(s)</text>
              <text x={CX + 4} y={14} fontSize="10" fill="#64748b" fontStyle="italic">Im(s)</text>
            </>
          ) : (
            <>
              <text x={CX} y={CY + 4} textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="600">STABLE</text>
              <text x={W - 20} y={20} textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">UNSTABLE</text>
              <text x={CX + R + 4} y={CY + 14} fontSize="9" fill="#64748b">|z|=1</text>
              <text x={W - 10} y={CY - 6} fontSize="10" fill="#64748b" fontStyle="italic">Re(z)</text>
              <text x={CX + 4} y={14} fontSize="10" fill="#64748b" fontStyle="italic">Im(z)</text>
            </>
          )}

          {/* Poles */}
          {showPoles && poles.map((pole, i) => {
            const px = CX + pole.re * scale
            const py = CY - pole.im * scale
            return (
              <g key={i}>
                <text
                  x={px}
                  y={py + 4}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill={pole.stable ? '#16a34a' : '#dc2626'}
                >
                  &times;
                </text>
              </g>
            )
          })}
        </svg>

        <div className="flex-1 space-y-3">
          <label className="flex items-center gap-2 text-[12px] text-slate-600">
            <input
              type="checkbox"
              checked={showPoles}
              onChange={e => setShowPoles(e.target.checked)}
              className="accent-indigo-500"
            />
            Show example poles
          </label>

          <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600 space-y-2">
            <p className="font-medium text-slate-700">
              {isCT ? 'Continuous-time rule:' : 'Discrete-time rule:'}
            </p>
            {isCT ? (
              <>
                <p>A CT-LTI system is <strong className="text-emerald-600">BIBO stable</strong> iff all poles have strictly negative real parts.</p>
                <p>Poles on the imaginary axis lead to marginally stable (oscillatory) behavior. Poles in the right half-plane cause exponential growth.</p>
              </>
            ) : (
              <>
                <p>A DT-LTI system is <strong className="text-emerald-600">BIBO stable</strong> iff all poles lie strictly inside the unit circle.</p>
                <p>Poles on the unit circle produce persistent oscillations. Poles outside cause geometric growth.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
