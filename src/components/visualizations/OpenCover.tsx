'use client'

import { useState, useEffect } from 'react'

export default function OpenCover() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [finite, setFinite] = useState(false)

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-80" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Compactness: Open Covers and Finite Subcovers</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          A set K is <strong>compact</strong> if every open cover of K has a finite subcover. Here the interval [0, 1] is covered by infinitely many small open intervals — but thanks to compactness, finitely many suffice.
        </p>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFinite(false)}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-md border transition-colors ${
              !finite ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            Show infinite cover
          </button>
          <button
            onClick={() => setFinite(true)}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-md border transition-colors ${
              finite ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            Extract finite subcover
          </button>
        </div>

        <svg viewBox="0 0 460 180" className="w-full" style={{ maxHeight: 220 }}>
          {/* Number line */}
          <line x1={40} y1={130} x2={420} y2={130} stroke="#334155" strokeWidth="1.5" />
          <line x1={50} y1={125} x2={50} y2={135} stroke="#334155" strokeWidth="1.5" />
          <line x1={410} y1={125} x2={410} y2={135} stroke="#334155" strokeWidth="1.5" />
          <text x={50} y={150} textAnchor="middle" fontSize="10" fill="#334155">0</text>
          <text x={410} y={150} textAnchor="middle" fontSize="10" fill="#334155">1</text>

          {/* The compact interval [0,1] */}
          <line x1={50} y1={130} x2={410} y2={130} stroke="#6366f1" strokeWidth="5" />
          <text x={230} y={164} textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="600">K = [0, 1]</text>

          {/* Cover arcs */}
          {!finite && (
            <>
              {/* Many small overlapping arcs */}
              {Array.from({ length: 12 }, (_, i) => {
                const centerX = 50 + (i / 11) * 360
                const r = 45
                const y = 90 + (i % 3) * 10
                return (
                  <g key={i} opacity="0.35">
                    <path d={`M ${centerX - r} 130 A ${r} 40 0 0 1 ${centerX + r} 130`}
                      fill="none" stroke="#059669" strokeWidth="2" />
                  </g>
                )
              })}
              <text x={230} y={40} textAnchor="middle" fontSize="11" fill="#059669" fontWeight="600">
                An (infinite) open cover: each arc is an open interval
              </text>
              <text x={230} y={56} textAnchor="middle" fontSize="10" fill="#64748b">
                Infinitely many Uα such that K ⊆ ⋃α Uα
              </text>
            </>
          )}

          {finite && (
            <>
              {/* Just 4 arcs cover [0,1] */}
              {[
                { cx: 100, r: 60 },
                { cx: 200, r: 60 },
                { cx: 300, r: 60 },
                { cx: 380, r: 60 },
              ].map((c, i) => (
                <g key={i}>
                  <path d={`M ${c.cx - c.r} 130 A ${c.r} 50 0 0 1 ${c.cx + c.r} 130`}
                    fill="none" stroke="#059669" strokeWidth="2.5" />
                  <text x={c.cx} y={76} textAnchor="middle" fontSize="10" fill="#065f46" fontWeight="600">
                    U{i + 1}
                  </text>
                </g>
              ))}
              <text x={230} y={40} textAnchor="middle" fontSize="11" fill="#059669" fontWeight="600">
                A finite subcover: only 4 intervals needed!
              </text>
              <text x={230} y={56} textAnchor="middle" fontSize="10" fill="#64748b">
                K ⊆ U₁ ∪ U₂ ∪ U₃ ∪ U₄
              </text>
            </>
          )}
        </svg>

        <div className="bg-slate-50 rounded-lg p-3 text-[12px] text-slate-600">
          <p className="font-medium text-slate-700 mb-1">Why does this matter?</p>
          <p>Compactness upgrades any &quot;local&quot; covering to a &quot;global&quot; one. That&apos;s why continuous functions on compact sets attain their max/min (extreme value theorem): you can stitch together finitely many local bounds into one global bound.</p>
        </div>
      </div>
    </div>
  )
}
