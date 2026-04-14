'use client'

import { useState, useEffect } from 'react'

type View = 'set' | 'interior' | 'closure' | 'boundary'

const viewLabels: Record<View, { label: string; desc: string; color: string }> = {
  set: { label: 'A itself', desc: 'The original set — includes some boundary points (solid edge) and misses others (dashed edge)', color: '#6366f1' },
  interior: { label: 'int(A)', desc: 'Interior: the largest open subset of A. The dashed disk only (no boundary).', color: '#0891b2' },
  closure: { label: 'cl(A)', desc: 'Closure: the smallest closed superset. All of A plus all missing boundary points.', color: '#059669' },
  boundary: { label: '∂A', desc: 'Boundary: points where every neighborhood hits both A and its complement.', color: '#dc2626' },
}

export default function InteriorClosureBoundary() {
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<View>('set')
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-64" />

  const current = viewLabels[view]

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Interior, Closure, and Boundary</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Click a label below to highlight the interior (largest open subset), closure (smallest closed superset), or boundary of a set A.
        </p>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
        <svg viewBox="0 0 300 260" className="w-full sm:w-1/2 flex-shrink-0" style={{ maxHeight: 280 }}>
          {/* Ambient space dashed box */}
          <rect x={20} y={20} width={260} height={220} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4" />
          <text x={270} y={16} fontSize="9" fill="#94a3b8" textAnchor="end">X</text>

          {/* The set A - a disk with part of boundary solid, part dashed */}
          {/* Solid boundary arc (upper-left to lower-right through the top) */}
          {view === 'set' && (
            <>
              <path d="M 80 130 A 70 70 0 0 1 220 130" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2" />
              <path d="M 220 130 A 70 70 0 0 1 80 130" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5,3" />
            </>
          )}

          {view === 'interior' && (
            <>
              {/* Light ghost of full set */}
              <circle cx={150} cy={130} r={70} fill="#e0f2fe" fillOpacity="0.4" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3,3" />
              {/* Interior: open disk, dashed boundary */}
              <circle cx={150} cy={130} r={70} fill="#0891b2" fillOpacity="0.25" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="5,3" />
              <text x={150} y={135} textAnchor="middle" fontSize="14" fill="#0c4a6e" fontWeight="600">int(A)</text>
            </>
          )}

          {view === 'closure' && (
            <>
              <circle cx={150} cy={130} r={70} fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="2" />
              <text x={150} y={135} textAnchor="middle" fontSize="14" fill="#064e3b" fontWeight="600">cl(A)</text>
            </>
          )}

          {view === 'boundary' && (
            <>
              {/* Ghost of set */}
              <circle cx={150} cy={130} r={70} fill="#f8fafc" fillOpacity="0.5" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3,3" />
              {/* Boundary ring */}
              <circle cx={150} cy={130} r={70} fill="none" stroke="#dc2626" strokeWidth="5" />
              <text x={150} y={135} textAnchor="middle" fontSize="14" fill="#7f1d1d" fontWeight="600">∂A</text>
            </>
          )}

          {/* Sample points */}
          <circle cx={150} cy={130} r={3} fill="#0c4a6e" />
          <text x={156} y={128} fontSize="9" fill="#0c4a6e">p</text>
          <text x={110} y={90} fontSize="9" fill="#64748b">interior pt</text>
        </svg>

        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(viewLabels) as View[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-2 text-[12px] font-medium rounded-md border transition-colors ${
                  view === v
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {viewLabels[v].label}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-700 mb-1" style={{ color: current.color }}>
              {current.label}
            </p>
            <p>{current.desc}</p>
          </div>

          <div className="text-[11px] text-slate-500 space-y-1">
            <p><strong>Key identities:</strong></p>
            <p>cl(A) = int(A) ∪ ∂A</p>
            <p>∂A = cl(A) \ int(A) = cl(A) ∩ cl(Aᶜ)</p>
            <p>A is open ⟺ A = int(A) ⟺ A ∩ ∂A = ∅</p>
            <p>A is closed ⟺ A = cl(A) ⟺ ∂A ⊆ A</p>
          </div>
        </div>
      </div>
    </div>
  )
}
