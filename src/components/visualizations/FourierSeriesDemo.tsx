'use client'

import { useState, useMemo, useEffect } from 'react'

const W = 460
const H = 140
const PAD = 35

type SignalType = 'square' | 'sawtooth' | 'triangle'

const signalFns: Record<SignalType, (t: number) => number> = {
  square: (t) => (((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) < Math.PI ? 1 : -1,
  sawtooth: (t) => {
    const p = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    return (p / Math.PI) - 1
  },
  triangle: (t) => {
    const p = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    return p < Math.PI ? (2 * p / Math.PI - 1) : (3 - 2 * p / Math.PI)
  },
}

const fourierCoeffs: Record<SignalType, (k: number) => number> = {
  square: (k) => k % 2 === 0 ? 0 : 4 / (Math.PI * k),
  sawtooth: (k) => k === 0 ? 0 : 2 * Math.pow(-1, k + 1) / (Math.PI * k),
  triangle: (k) => k % 2 === 0 ? 0 : 8 * Math.pow(-1, (k - 1) / 2) / (Math.PI * Math.PI * k * k),
}

export default function FourierSeriesDemo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [N, setN] = useState(3)
  const [signal, setSignal] = useState<SignalType>('square')

  const points = useMemo(() => {
    const original: string[] = []
    const approx: string[] = []
    const tRange = 3 * Math.PI
    const steps = 300

    for (let i = 0; i <= steps; i++) {
      const t = -tRange / 2 + (i / steps) * tRange
      const x = PAD + (i / steps) * (W - 2 * PAD)

      // Original signal
      const yOrig = signalFns[signal](t)
      original.push(`${x},${H / 2 - yOrig * (H / 2 - PAD) * 0.85}`)

      // Fourier approximation
      let yApprox = 0
      const coeffFn = fourierCoeffs[signal]
      for (let k = 1; k <= N; k++) {
        const bk = coeffFn(k)
        yApprox += bk * Math.sin(k * t)
      }
      approx.push(`${x},${H / 2 - yApprox * (H / 2 - PAD) * 0.85}`)
    }

    return { original: original.join(' '), approx: approx.join(' ') }
  }, [N, signal])

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-700">Fourier Series Approximation</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Partial sums converge to the original signal as N increases
          </p>
        </div>
        <div className="flex gap-1.5">
          {(['square', 'sawtooth', 'triangle'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSignal(s)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors ${
                signal === s
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-4">
          <label className="text-[12px] font-medium text-slate-500 min-w-[100px]">
            N = {N} term{N !== 1 ? 's' : ''}
          </label>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={N}
            onChange={e => setN(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 180 }}>
          {/* Axis */}
          <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#e5e7eb" strokeWidth="0.5" />

          {/* Original signal */}
          <polyline points={points.original} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Fourier approximation */}
          <polyline points={points.approx} fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>

        <div className="flex gap-4 text-[11px] text-slate-500">
          <span><span className="inline-block w-3 h-0.5 bg-slate-300 align-middle mr-1" /> Original</span>
          <span><span className="inline-block w-3 h-0.5 bg-indigo-500 align-middle mr-1" /> N-term approximation</span>
        </div>
      </div>
    </div>
  )
}
