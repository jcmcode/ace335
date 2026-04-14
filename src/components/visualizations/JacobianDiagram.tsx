'use client'

import { useState, useEffect } from 'react'

type Example = 'gradient' | 'curve' | 'vector-field' | 'square'

const examples: Record<Example, { n: number; m: number; fname: string; descr: string; matrix: string[][] }> = {
  gradient: {
    n: 3, m: 1,
    fname: 'f: ℝ³ → ℝ',
    descr: 'Scalar-valued function of 3 variables. Jacobian is a 1 × 3 row vector (the gradient).',
    matrix: [['∂f/∂x', '∂f/∂y', '∂f/∂z']],
  },
  curve: {
    n: 1, m: 3,
    fname: 'γ: ℝ → ℝ³',
    descr: 'Parametric curve in 3D. Jacobian is a 3 × 1 column vector (the velocity).',
    matrix: [['γ₁′(t)'], ['γ₂′(t)'], ['γ₃′(t)']],
  },
  'vector-field': {
    n: 2, m: 2,
    fname: 'F: ℝ² → ℝ²',
    descr: 'Planar vector field. Jacobian is a 2 × 2 matrix.',
    matrix: [
      ['∂F₁/∂x', '∂F₁/∂y'],
      ['∂F₂/∂x', '∂F₂/∂y'],
    ],
  },
  square: {
    n: 3, m: 3,
    fname: 'F: ℝ³ → ℝ³',
    descr: 'Vector field in 3D. Jacobian is a 3 × 3 square matrix. Determinant = 0 at singular points.',
    matrix: [
      ['∂F₁/∂x', '∂F₁/∂y', '∂F₁/∂z'],
      ['∂F₂/∂x', '∂F₂/∂y', '∂F₂/∂z'],
      ['∂F₃/∂x', '∂F₃/∂y', '∂F₃/∂z'],
    ],
  },
}

export default function JacobianDiagram() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [ex, setEx] = useState<Example>('vector-field')

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-80" />

  const e = examples[ex]

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">The Jacobian Matrix: Dimensions and Structure</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          For a function f: ℝⁿ → ℝᵐ, the Jacobian Df(x) is an <strong>m × n matrix</strong> (m rows for m outputs, n columns for n inputs). Each column is a partial derivative direction; each row is the gradient of one component.
        </p>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(examples) as Example[]).map(key => (
            <button
              key={key}
              onClick={() => setEx(key)}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-md border transition-colors ${
                ex === key ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {examples[key].fname}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Dimension badge */}
          <div className="flex items-center gap-3 text-[12px]">
            <span className="font-mono text-slate-600">{e.fname}</span>
            <span className="text-slate-400">⟹</span>
            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-md font-semibold">
              {e.m} × {e.n} Jacobian
            </span>
          </div>

          {/* Matrix display */}
          <div className="flex items-center gap-2">
            <div className="text-[22px] text-slate-400 font-thin leading-none">⎡</div>
            <div className="grid gap-x-3 gap-y-1.5" style={{ gridTemplateColumns: `repeat(${e.n}, auto)` }}>
              {e.matrix.flatMap((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-[13px] font-mono text-slate-700 text-center min-w-[70px]"
                  >
                    {cell}
                  </div>
                ))
              )}
            </div>
            <div className="text-[22px] text-slate-400 font-thin leading-none">⎤</div>
          </div>

          <p className="text-[12px] text-slate-500 text-center max-w-md">{e.descr}</p>
        </div>

        {/* Chain rule preview */}
        <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600 space-y-2">
          <p className="font-medium text-slate-700">Why dimensions matter:</p>
          <p>If g: ℝᵖ → ℝⁿ and f: ℝⁿ → ℝᵐ, then (f∘g): ℝᵖ → ℝᵐ and the chain rule says:</p>
          <div className="text-center py-1">
            <span className="font-mono text-[13px]">D(f∘g)(x)</span>
            <span className="mx-2 text-slate-400">=</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded">Df(g(x))</span>
            <span className="mx-1 text-slate-400">·</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Dg(x)</span>
          </div>
          <p className="text-center text-[11px] text-slate-500">
            [m × p] = [m × n] · [n × p] — inner dimensions match and &ldquo;cancel&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
