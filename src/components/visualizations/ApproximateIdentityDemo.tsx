'use client'

import { useState, useMemo, useEffect } from 'react'

const W = 460
const H = 160
const PAD = 35

export default function ApproximateIdentityDemo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [n, setN] = useState(3)

  const points = useMemo(() => {
    const rect: string[] = []
    const gauss: string[] = []
    const sinc: string[] = []
    const steps = 400

    for (let i = 0; i <= steps; i++) {
      const t = -3 + (i / steps) * 6
      const x = PAD + (i / steps) * (W - 2 * PAD)

      // Rectangle: height n, width 1/n, centered at 0
      const rVal = Math.abs(t) <= 1 / (2 * n) ? n : 0
      rect.push(`${x},${H - PAD - rVal * ((H - 2 * PAD) / (n + 1))}`)

      // Gaussian: n/sqrt(2pi) * exp(-n^2 t^2 / 2)
      const gVal = (n / Math.sqrt(2 * Math.PI)) * Math.exp(-n * n * t * t / 2)
      gauss.push(`${x},${H - PAD - gVal * ((H - 2 * PAD) / (n + 1))}`)

      // Sinc: sin(n*pi*t) / (pi*t)
      const sVal = Math.abs(t) < 0.001 ? n : Math.sin(n * Math.PI * t) / (Math.PI * t)
      sinc.push(`${x},${H - PAD - sVal * ((H - 2 * PAD) / (n + 1))}`)
    }

    return { rect: rect.join(' '), gauss: gauss.join(' '), sinc: sinc.join(' ') }
  }, [n])

  const baseline = H - PAD

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">Approximate Identity Sequences</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Three sequences that converge to the Dirac delta as n grows — area always equals 1
        </p>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-4">
          <label className="text-[12px] font-medium text-slate-500 min-w-[70px]">
            n = {n}
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={n}
            onChange={e => setN(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
          <line x1={PAD} y1={baseline} x2={W - PAD} y2={baseline} stroke="#e5e7eb" strokeWidth="0.5" />
          {/* Center line */}
          <line x1={W / 2} y1={PAD - 5} x2={W / 2} y2={baseline} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="3,3" />
          <text x={W / 2} y={baseline + 12} textAnchor="middle" fontSize="8" fill="#94a3b8">t = 0</text>

          {/* Rectangle */}
          <polyline points={points.rect} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Gaussian */}
          <polyline points={points.gauss} fill="none" stroke="#10b981" strokeWidth="1.5" />
          {/* Sinc */}
          <polyline points={points.sinc} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />
        </svg>

        <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
          <span><span className="inline-block w-3 h-0.5 bg-blue-500 align-middle mr-1" /> Rectangle</span>
          <span><span className="inline-block w-3 h-0.5 bg-emerald-500 align-middle mr-1" /> Gaussian</span>
          <span><span className="inline-block w-3 h-0.5 bg-amber-500 align-middle mr-1" /> Sinc</span>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 text-[11px] text-slate-500">
          As n increases, all three sequences become taller and narrower, concentrating their unit area at t = 0. In the limit, they behave like the Dirac delta: convolving with any continuous function returns that function&apos;s value at the origin.
        </div>
      </div>
    </div>
  )
}
