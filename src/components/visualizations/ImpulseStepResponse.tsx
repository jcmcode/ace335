'use client'

import { useState, useMemo, useEffect } from 'react'

const W = 440
const H = 120
const PAD = 35

type SystemType = 'first-order' | 'second-underdamped' | 'second-overdamped'

const systemParams: Record<SystemType, { label: string; impulse: (t: number) => number; step: (t: number) => number }> = {
  'first-order': {
    label: '1/(s+1)',
    impulse: (t) => t >= 0 ? Math.exp(-t) : 0,
    step: (t) => t >= 0 ? 1 - Math.exp(-t) : 0,
  },
  'second-underdamped': {
    label: '1/(s²+s+1)',
    impulse: (t) => {
      if (t < 0) return 0
      const wd = Math.sqrt(3) / 2
      return (2 / Math.sqrt(3)) * Math.exp(-t / 2) * Math.sin(wd * t)
    },
    step: (t) => {
      if (t < 0) return 0
      const wd = Math.sqrt(3) / 2
      return 1 - Math.exp(-t / 2) * (Math.cos(wd * t) + (1 / Math.sqrt(3)) * Math.sin(wd * t))
    },
  },
  'second-overdamped': {
    label: '1/((s+1)(s+3))',
    impulse: (t) => t >= 0 ? 0.5 * (Math.exp(-t) - Math.exp(-3 * t)) : 0,
    step: (t) => t >= 0 ? 1 / 3 + (1 / 6) * (-3 * Math.exp(-t) + Math.exp(-3 * t)) : 0,
  },
}

export default function ImpulseStepResponse() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [system, setSystem] = useState<SystemType>('first-order')
  const params = systemParams[system]

  const impulsePoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const t = -0.5 + (i / 200) * 8
      const x = PAD + (i / 200) * (W - 2 * PAD)
      const v = params.impulse(t)
      const y = H / 2 - v * (H / 2 - PAD) * 0.8
      pts.push(`${x},${Math.max(5, Math.min(H - 5, y))}`)
    }
    return pts.join(' ')
  }, [params])

  const stepPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const t = -0.5 + (i / 200) * 8
      const x = PAD + (i / 200) * (W - 2 * PAD)
      const v = params.step(t)
      const y = H - PAD - v * (H - 2 * PAD) * 0.7
      pts.push(`${x},${Math.max(5, Math.min(H - 5, y))}`)
    }
    return pts.join(' ')
  }, [params])

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-700">Impulse and Step Response</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            How LTI systems respond to impulse and step inputs
          </p>
        </div>
        <div className="flex gap-1.5">
          {(Object.keys(systemParams) as SystemType[]).map(s => (
            <button
              key={s}
              onClick={() => setSystem(s)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors ${
                system === s
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {systemParams[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-2">
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Impulse Response h(t)
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
            <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#e5e7eb" strokeWidth="0.5" />
            <polyline points={impulsePoints} fill="none" stroke="#6366f1" strokeWidth="2" />
            <text x={W - PAD + 4} y={H / 2 + 3} fontSize="8" fill="#94a3b8">t</text>
          </svg>
        </div>

        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Step Response s(t)
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
            <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#e5e7eb" strokeWidth="0.5" />
            {/* DC level */}
            <line x1={PAD} y1={H - PAD - (H - 2 * PAD) * 0.7} x2={W - PAD} y2={H - PAD - (H - 2 * PAD) * 0.7} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4,4" />
            <polyline points={stepPoints} fill="none" stroke="#10b981" strokeWidth="2" />
            <text x={W - PAD + 4} y={H - PAD + 3} fontSize="8" fill="#94a3b8">t</text>
          </svg>
        </div>

        <div className="flex gap-4 text-[11px] text-slate-500 pt-1">
          <span><span className="inline-block w-3 h-0.5 bg-indigo-500 align-middle mr-1" /> Impulse response</span>
          <span><span className="inline-block w-3 h-0.5 bg-emerald-500 align-middle mr-1" /> Step response</span>
        </div>
      </div>
    </div>
  )
}
