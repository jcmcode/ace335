'use client'

import { useState, useEffect } from 'react'

type PlaneType = 'laplace' | 'z'

export default function ROCVisualization({ type = 'laplace' }: { type?: PlaneType }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const isZ = type === 'z'
  const CX = 150
  const CY = 130
  const R = 100

  const regions = isZ
    ? [
        { id: 'inside', label: 'Inside unit circle', desc: 'Causal anti-stable or anti-causal stable', color: '#dbeafe' },
        { id: 'outside', label: 'Outside unit circle', desc: 'Causal stable systems (ROC includes unit circle)', color: '#dcfce7' },
        { id: 'annular', label: 'Annular region', desc: 'Two-sided sequences', color: '#fef9c3' },
      ]
    : [
        { id: 'right', label: 'Right half-plane', desc: 'Causal stable systems (Re(s) > −a)', color: '#dcfce7' },
        { id: 'left', label: 'Left half-plane', desc: 'Anti-causal systems', color: '#dbeafe' },
        { id: 'strip', label: 'Vertical strip', desc: 'Two-sided signals', color: '#fef9c3' },
      ]

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">
          {isZ ? 'Z-Transform Regions of Convergence (z-Plane)' : 'Laplace Transform Regions of Convergence (s-Plane)'}
        </h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {isZ
            ? 'The ROC determines whether a system is causal and stable. Hover over each region type to see it highlighted on the z-plane. For a causal stable system, the ROC must include the unit circle.'
            : 'The ROC determines whether a system is causal and stable. Hover over each region type to see it highlighted on the s-plane. For a causal stable system, the ROC is a right half-plane that includes the imaginary axis.'}
        </p>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-5">
        {/* Plane diagram */}
        <svg viewBox="0 0 300 260" className="w-full sm:w-1/2 flex-shrink-0" style={{ maxHeight: 280 }}>
          {/* Grid */}
          <line x1={CX} y1={10} x2={CX} y2={250} stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1={20} y1={CY} x2={280} y2={CY} stroke="#e5e7eb" strokeWidth="0.5" />

          {isZ ? (
            <>
              {/* Unit circle */}
              <circle cx={CX} cy={CY} r={R * 0.7} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
              <text x={CX + R * 0.7 + 4} y={CY - 4} fontSize="8" fill="#94a3b8">|z|=1</text>

              {/* ROC shading based on active */}
              {activeRegion === 'outside' && (
                <>
                  <circle cx={CX} cy={CY} r={R} fill="#dcfce7" opacity="0.5" />
                  <circle cx={CX} cy={CY} r={R * 0.7} fill="white" />
                </>
              )}
              {activeRegion === 'inside' && (
                <circle cx={CX} cy={CY} r={R * 0.7} fill="#dbeafe" opacity="0.5" />
              )}
              {activeRegion === 'annular' && (
                <>
                  <circle cx={CX} cy={CY} r={R * 0.85} fill="#fef9c3" opacity="0.4" />
                  <circle cx={CX} cy={CY} r={R * 0.5} fill="white" />
                </>
              )}

              {/* Poles and zeros */}
              <text x={CX + R * 0.4} y={CY + R * 0.3} fontSize="10" fill="#ef4444" fontWeight="bold">&times;</text>
              <text x={CX - R * 0.5} y={CY - R * 0.2} fontSize="10" fill="#ef4444" fontWeight="bold">&times;</text>
              <circle cx={CX + R * 0.2} cy={CY - R * 0.4} r={4} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            </>
          ) : (
            <>
              {/* jw axis label */}
              <text x={CX + 4} y={16} fontSize="9" fill="#64748b" fontStyle="italic">jω</text>
              <text x={272} y={CY - 4} fontSize="9" fill="#64748b" fontStyle="italic">σ</text>

              {/* ROC shading */}
              {activeRegion === 'right' && (
                <rect x={CX + 20} y={10} width={CX + 20} height={240} fill="#dcfce7" opacity="0.4" />
              )}
              {activeRegion === 'left' && (
                <rect x={20} y={10} width={CX - 20} height={240} fill="#dbeafe" opacity="0.4" />
              )}
              {activeRegion === 'strip' && (
                <rect x={CX - 30} y={10} width={60} height={240} fill="#fef9c3" opacity="0.4" />
              )}

              {/* Poles */}
              <text x={CX + 30} y={CY - 25} fontSize="10" fill="#ef4444" fontWeight="bold">&times;</text>
              <text x={CX - 40} y={CY + 30} fontSize="10" fill="#ef4444" fontWeight="bold">&times;</text>
              {/* Zeros */}
              <circle cx={CX - 20} cy={CY - 40} r={4} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            </>
          )}

          {/* Legend */}
          <g transform="translate(20, 240)">
            <text x={0} y={0} fontSize="8" fill="#ef4444" fontWeight="bold">&times;</text>
            <text x={12} y={0} fontSize="8" fill="#64748b">Poles</text>
            <circle cx={52} cy={-3} r={3} fill="none" stroke="#3b82f6" strokeWidth="1" />
            <text x={60} y={0} fontSize="8" fill="#64748b">Zeros</text>
          </g>
        </svg>

        {/* Region descriptions */}
        <div className="flex-1 space-y-2">
          <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-2">ROC Types</p>
          {regions.map(r => (
            <button
              key={r.id}
              onMouseEnter={() => setActiveRegion(r.id)}
              onMouseLeave={() => setActiveRegion(null)}
              onClick={() => setActiveRegion(activeRegion === r.id ? null : r.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all text-[13px] ${
                activeRegion === r.id
                  ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: r.color, border: '1px solid #d1d5db' }} />
                <span className="font-medium text-slate-700">{r.label}</span>
              </div>
              <p className="text-[11px] text-slate-500 ml-[18px]">{r.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
