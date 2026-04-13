'use client'

import { useState, useMemo, useEffect } from 'react'

const W = 440
const H = 120
const PAD = 45

// First-order system: H(s) = 1/(s + a) => H(jw) = 1/(jw + a)
// |H| = 1/sqrt(w^2 + a^2), angle = -arctan(w/a)
export default function BodePlotDemo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const a = 1 // pole at s = -1

  const magPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const logW = -2 + (i / 200) * 4 // log10(w) from -2 to 2
      const w = Math.pow(10, logW)
      const mag = 1 / Math.sqrt(w * w + a * a)
      const magDb = 20 * Math.log10(mag)

      const x = PAD + (i / 200) * (W - 2 * PAD)
      const y = H / 2 - (magDb / 60) * (H - 2 * PAD) // scale: -60dB range
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  // Asymptote lines
  const asymLow = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 100; i++) {
      const logW = -2 + (i / 100) * 2 // up to corner freq
      const x = PAD + (i / 200) * (W - 2 * PAD)  // first half
      const y = H / 2 // 0 dB
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  const asymHigh = useMemo(() => {
    const pts: string[] = []
    for (let i = 100; i <= 200; i++) {
      const logW = -2 + (i / 200) * 4
      const w = Math.pow(10, logW)
      const magDb = -20 * Math.log10(w / a) // -20dB/decade
      const x = PAD + (i / 200) * (W - 2 * PAD)
      const y = H / 2 - (magDb / 60) * (H - 2 * PAD)
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  const phasePoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const logW = -2 + (i / 200) * 4
      const w = Math.pow(10, logW)
      const phase = -Math.atan(w / a) * (180 / Math.PI) // degrees

      const x = PAD + (i / 200) * (W - 2 * PAD)
      const y = H / 2 - (phase / 120) * (H - 2 * PAD)
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  // Corner frequency marker
  const cornerX = PAD + (2 / 4) * (W - 2 * PAD) // logW = 0 => w = 1

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Bode Plot: How a System Responds at Each Frequency</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          For H(s) = 1/(s+1), the top plot shows how much the system amplifies or attenuates each frequency (in dB), and the bottom shows the phase shift. The orange dot marks the corner frequency where magnitude drops by 3 dB and phase is -45 degrees. Dashed lines show the straight-line asymptotic approximations used in hand-sketching.
        </p>
      </div>

      <div className="p-5 space-y-2">
        {/* Magnitude plot */}
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Magnitude (dB)</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
            {/* Grid */}
            {[-20, 0].map(db => {
              const y = H / 2 - (db / 60) * (H - 2 * PAD)
              return (
                <g key={db}>
                  <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
                  <text x={PAD - 4} y={y + 3} textAnchor="end" fontSize="8" fill="#94a3b8">{db}</text>
                </g>
              )
            })}

            {/* Corner frequency */}
            <line x1={cornerX} y1={10} x2={cornerX} y2={H - 10} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <text x={cornerX} y={H - 4} textAnchor="middle" fontSize="7" fill="#f59e0b">w=1</text>

            {/* Asymptotes */}
            <polyline points={asymLow} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
            <polyline points={asymHigh} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />

            {/* Actual magnitude */}
            <polyline points={magPoints} fill="none" stroke="#6366f1" strokeWidth="2" />

            {/* -3dB marker */}
            {(() => {
              const db3 = -3.01
              const y3 = H / 2 - (db3 / 60) * (H - 2 * PAD)
              return <circle cx={cornerX} cy={y3} r="3" fill="#f59e0b" stroke="white" strokeWidth="1" />
            })()}

            {/* Axis labels */}
            <text x={W - PAD + 4} y={H / 2 + 3} fontSize="8" fill="#94a3b8">log w</text>
          </svg>
        </div>

        {/* Phase plot */}
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Phase (degrees)</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
            {/* Grid */}
            {[0, -45, -90].map(deg => {
              const y = H / 2 - (deg / 120) * (H - 2 * PAD)
              return (
                <g key={deg}>
                  <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
                  <text x={PAD - 4} y={y + 3} textAnchor="end" fontSize="8" fill="#94a3b8">{deg}°</text>
                </g>
              )
            })}

            {/* Corner frequency */}
            <line x1={cornerX} y1={10} x2={cornerX} y2={H - 10} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

            {/* Phase curve */}
            <polyline points={phasePoints} fill="none" stroke="#10b981" strokeWidth="2" />

            {/* -45° marker */}
            {(() => {
              const y45 = H / 2 - (-45 / 120) * (H - 2 * PAD)
              return <circle cx={cornerX} cy={y45} r="3" fill="#f59e0b" stroke="white" strokeWidth="1" />
            })()}

            <text x={W - PAD + 4} y={H / 2 + 3} fontSize="8" fill="#94a3b8">log w</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 pt-1">
          <span><span className="inline-block w-3 h-0.5 bg-indigo-500 align-middle mr-1" /> Magnitude</span>
          <span><span className="inline-block w-3 h-0.5 bg-emerald-500 align-middle mr-1" /> Phase</span>
          <span><span className="inline-block w-3 h-0.5 bg-slate-400 align-middle mr-1" style={{ borderTop: '1px dashed' }} /> Asymptotes</span>
          <span><span className="inline-block w-2 h-2 bg-amber-400 rounded-full align-middle mr-1" /> Corner freq (-3dB, -45°)</span>
        </div>
      </div>
    </div>
  )
}
