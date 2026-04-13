'use client'

import { useState, useMemo, useEffect } from 'react'

const W = 460
const H = 100
const PAD = 30

export default function ConvolutionDemo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [tau, setTau] = useState(0.5)

  // h(t) = e^{-t} * u(t) — impulse response
  const hPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * 4 - 1
      const x = PAD + ((t + 1) / 5) * (W - 2 * PAD)
      const val = t >= 0 ? Math.exp(-t) : 0
      const y = H - PAD - val * (H - 2 * PAD)
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  // x(t) = rect(t - 0.5) — input (pulse from 0 to 1)
  const xPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * 4 - 1
      const x = PAD + ((t + 1) / 5) * (W - 2 * PAD)
      const val = (t >= 0 && t <= 1) ? 1 : 0
      const y = H - PAD - val * (H - 2 * PAD) * 0.8
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  // h(tau) flipped and shifted: h(t - tau)
  const hFlippedPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * 4 - 1
      const x = PAD + ((t + 1) / 5) * (W - 2 * PAD)
      const arg = tau - t
      const val = arg >= 0 ? Math.exp(-arg) : 0
      const y = H - PAD - val * (H - 2 * PAD)
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [tau])

  // Product region (overlap)
  const productPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = []
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * 4 - 1
      const x = PAD + ((t + 1) / 5) * (W - 2 * PAD)
      const xVal = (t >= 0 && t <= 1) ? 1 : 0
      const arg = tau - t
      const hVal = arg >= 0 ? Math.exp(-arg) : 0
      const product = xVal * hVal
      const y = H - PAD - product * (H - 2 * PAD) * 0.8
      pts.push({ x, y })
    }
    return pts
  }, [tau])

  // Compute convolution output y(t) = integral
  const yOutput = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * 4 - 1
      const x = PAD + ((t + 1) / 5) * (W - 2 * PAD)
      // y(t) = int_0^min(t,1) e^{-(t-s)} ds for t >= 0
      let val = 0
      if (t >= 0 && t <= 1) {
        val = 1 - Math.exp(-t)
      } else if (t > 1) {
        val = (Math.exp(1) - 1) * Math.exp(-t)
      }
      const y = H - PAD - val * (H - 2 * PAD)
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  const baseline = H - PAD

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-64" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700">How Convolution Works</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Convolution computes the output of an LTI system: flip the impulse response, slide it across the input, and at each position the output equals the area of their overlap. Drag the slider to move through time.
        </p>
      </div>

      <div className="p-5 space-y-3">
        {/* Slider */}
        <div className="flex items-center gap-4">
          <label className="text-[12px] font-medium text-slate-500 min-w-[80px]">
            t = {tau.toFixed(2)}
          </label>
          <input
            type="range"
            min={-0.5}
            max={3.5}
            step={0.02}
            value={tau}
            onChange={e => setTau(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Signals being convolved */}
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Input x(t) <span className="text-sky-500">blue</span> &middot; Flipped h(t-&tau;) <span className="text-rose-500">red</span> &middot; Overlap <span className="text-violet-500">purple</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 120 }}>
            <line x1={PAD} y1={baseline} x2={W - PAD} y2={baseline} stroke="#e5e7eb" strokeWidth="0.5" />
            {/* x(t) */}
            <polyline points={xPoints} fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7" />
            {/* h(t - tau) flipped */}
            <polyline points={hFlippedPoints} fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
            {/* Product shading */}
            <polygon
              points={productPoints.map(p => `${p.x},${p.y}`).join(' ') + ` ${productPoints[productPoints.length - 1].x},${baseline} ${productPoints[0].x},${baseline}`}
              fill="#8b5cf6"
              opacity="0.2"
            />
            {/* t marker */}
            {(() => {
              const tx = PAD + ((tau + 1) / 5) * (W - 2 * PAD)
              return <line x1={tx} y1={10} x2={tx} y2={baseline} stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3" />
            })()}
          </svg>
        </div>

        {/* Output */}
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Output y(t) = (x * h)(t) <span className="text-emerald-500">green</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 120 }}>
            <line x1={PAD} y1={baseline} x2={W - PAD} y2={baseline} stroke="#e5e7eb" strokeWidth="0.5" />
            <polyline points={yOutput} fill="none" stroke="#10b981" strokeWidth="2" />
            {/* Current point */}
            {(() => {
              const tx = PAD + ((tau + 1) / 5) * (W - 2 * PAD)
              let val = 0
              if (tau >= 0 && tau <= 1) val = 1 - Math.exp(-tau)
              else if (tau > 1) val = (Math.exp(1) - 1) * Math.exp(-tau)
              const ty = baseline - val * (H - 2 * PAD)
              return (
                <>
                  <line x1={tx} y1={baseline} x2={tx} y2={ty} stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3" />
                  <circle cx={tx} cy={ty} r="3.5" fill="#10b981" stroke="white" strokeWidth="1.5" />
                </>
              )
            })()}
          </svg>
        </div>
      </div>
    </div>
  )
}
