'use client'

import { useState, useEffect } from 'react'

type Type = 'min' | 'max' | 'saddle' | 'degenerate'

const types: Record<Type, { label: string; hessian: string; eigs: string; shape: string; color: string }> = {
  min: {
    label: 'Local Minimum',
    hessian: 'H = [[2,0],[0,2]]',
    eigs: 'λ₁ = λ₂ = 2 (both positive)',
    shape: 'Bowl opening upward',
    color: '#059669',
  },
  max: {
    label: 'Local Maximum',
    hessian: 'H = [[-2,0],[0,-2]]',
    eigs: 'λ₁ = λ₂ = -2 (both negative)',
    shape: 'Bowl opening downward',
    color: '#dc2626',
  },
  saddle: {
    label: 'Saddle Point',
    hessian: 'H = [[2,0],[0,-2]]',
    eigs: 'λ₁ = 2 > 0, λ₂ = -2 < 0',
    shape: 'Saddle (like a Pringles chip)',
    color: '#d97706',
  },
  degenerate: {
    label: 'Degenerate (test fails)',
    hessian: 'H = [[0,0],[0,0]]',
    eigs: 'Eigenvalues are zero',
    shape: 'Higher-order test needed',
    color: '#64748b',
  },
}

function SurfaceView({ type }: { type: Type }) {
  // Draw a stylized surface based on type
  const W = 240
  const H = 180
  const CX = W / 2
  const CY = H / 2

  const z = (x: number, y: number): number => {
    if (type === 'min') return x * x + y * y
    if (type === 'max') return -(x * x + y * y)
    if (type === 'saddle') return x * x - y * y
    return 0
  }

  // Build a grid of lines showing the surface
  const lines: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = []
  const range = 2
  const steps = 10

  for (let i = 0; i <= steps; i++) {
    for (let j = 0; j <= steps; j++) {
      const x1 = -range + (i / steps) * 2 * range
      const y1 = -range + (j / steps) * 2 * range
      const z1 = z(x1, y1)

      // Project to screen (isometric-ish)
      const projX1 = CX + (x1 - y1) * 20
      const projY1 = CY + (x1 + y1) * 8 - z1 * 10

      if (i < steps) {
        const x2 = -range + ((i + 1) / steps) * 2 * range
        const y2 = y1
        const z2 = z(x2, y2)
        const projX2 = CX + (x2 - y2) * 20
        const projY2 = CY + (x2 + y2) * 8 - z2 * 10
        lines.push({ x1: projX1, y1: projY1, x2: projX2, y2: projY2, opacity: 0.4 })
      }
      if (j < steps) {
        const x2 = x1
        const y2 = -range + ((j + 1) / steps) * 2 * range
        const z2 = z(x2, y2)
        const projX2 = CX + (x2 - y2) * 20
        const projY2 = CY + (x2 + y2) * 8 - z2 * 10
        lines.push({ x1: projX1, y1: projY1, x2: projX2, y2: projY2, opacity: 0.4 })
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={types[type].color} strokeWidth="0.8" opacity={l.opacity} />
      ))}
      {/* Critical point */}
      <circle cx={CX} cy={CY} r="3" fill="#0f172a" />
    </svg>
  )
}

export default function HessianClassification() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [type, setType] = useState<Type>('min')

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-80" />

  const t = types[type]

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Second Derivative Test: Classifying Critical Points by the Hessian</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          At a critical point (∇f = 0), the Hessian&apos;s eigenvalues determine the shape. All positive → local min; all negative → local max; mixed signs → saddle; zero → inconclusive.
        </p>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(types) as Type[]).map(k => (
            <button
              key={k}
              onClick={() => setType(k)}
              className={`px-2.5 py-2 text-[12px] font-medium rounded-md border transition-colors ${
                type === k ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {types[k].label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5 items-center">
          <SurfaceView type={type} />
          <div className="space-y-2 text-[12px] text-slate-600">
            <p className="font-semibold" style={{ color: t.color }}>{t.label}</p>
            <div className="bg-slate-50 rounded-lg p-3 space-y-1 font-mono text-[11px]">
              <p>Hessian: {t.hessian}</p>
              <p>Eigenvalues: {t.eigs}</p>
              <p className="text-slate-500 font-sans mt-2">{t.shape}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 text-[11px] text-slate-600">
          <p className="font-medium text-slate-700 mb-1">The test (at a critical point):</p>
          <p>• H positive definite (all λᵢ &gt; 0) → local min</p>
          <p>• H negative definite (all λᵢ &lt; 0) → local max</p>
          <p>• H indefinite (mixed signs) → saddle point</p>
          <p>• H positive/negative semidefinite with a zero eigenvalue → test inconclusive; need higher-order info</p>
        </div>
      </div>
    </div>
  )
}
