'use client'

import { useState, useMemo, useEffect } from 'react'

const W = 480
const H = 120
const PAD = 30

function sinc(x: number): number {
  if (Math.abs(x) < 1e-10) return 1
  return Math.sin(Math.PI * x) / (Math.PI * x)
}

export default function SamplingDemo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [fs, setFs] = useState(8) // sampling frequency
  const fSignal = 2 // signal frequency (Hz)
  const fNyquist = 2 * fSignal

  const isAliasing = fs < fNyquist

  // Generate continuous signal
  const continuousPoints = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * 2
      const x = PAD + (i / 200) * (W - 2 * PAD)
      const y = H / 2 - 35 * (0.7 * Math.sin(2 * Math.PI * fSignal * t) + 0.3 * Math.sin(2 * Math.PI * (fSignal * 0.7) * t))
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  // Generate samples
  const samples = useMemo(() => {
    const pts: { x: number; y: number; t: number }[] = []
    const dt = 1 / fs
    let t = 0
    while (t <= 2) {
      const xPos = PAD + (t / 2) * (W - 2 * PAD)
      const yPos = H / 2 - 35 * (0.7 * Math.sin(2 * Math.PI * fSignal * t) + 0.3 * Math.sin(2 * Math.PI * (fSignal * 0.7) * t))
      pts.push({ x: xPos, y: yPos, t })
      t += dt
    }
    return pts
  }, [fs])

  // Generate spectrum
  const spectrumContinuous = useMemo(() => {
    const pts: string[] = []
    const specW = W - 2 * PAD
    for (let i = 0; i <= 200; i++) {
      const f = (i / 200) * 20 - 10
      const x = PAD + ((f + 10) / 20) * specW
      const mag = 0.5 * (sinc((f - fSignal) / 0.8) + sinc((f + fSignal) / 0.8))
      const y = H / 2 - Math.abs(mag) * 35
      pts.push(`${x},${y}`)
    }
    return pts.join(' ')
  }, [])

  // Generate aliased spectrum copies
  const aliasedSpectrum = useMemo(() => {
    const paths: string[][] = []
    for (let k = -2; k <= 2; k++) {
      const pts: string[] = []
      const specW = W - 2 * PAD
      for (let i = 0; i <= 200; i++) {
        const f = (i / 200) * 20 - 10
        const fShifted = f - k * fs
        const x = PAD + ((f + 10) / 20) * specW
        const mag = 0.5 * (sinc((fShifted - fSignal) / 0.8) + sinc((fShifted + fSignal) / 0.8))
        const y = H / 2 - Math.abs(mag) * 35
        pts.push(`${x},${y}`)
      }
      paths.push(pts)
    }
    return paths
  }, [fs])

  if (!mounted) return <div className="my-10 border border-slate-200 rounded-xl bg-white h-48" />

  return (
    <div className="my-10 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-700">The Sampling Theorem in Action</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Drag the slider to change how fast we sample a {fSignal} Hz signal. Below {fNyquist} Hz (the Nyquist rate), spectral copies overlap and the signal can&apos;t be recovered (aliasing).
          </p>
        </div>
        <div className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${isAliasing ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {isAliasing ? 'Aliasing!' : 'No aliasing'}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Slider */}
        <div className="flex items-center gap-4">
          <label className="text-[12px] font-medium text-slate-500 min-w-[90px]">
            f<sub>s</sub> = {fs} Hz
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            value={fs}
            onChange={e => setFs(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Time domain */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Time Domain</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
            {/* Axis */}
            <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#e5e7eb" strokeWidth="0.5" />
            <text x={W - PAD + 4} y={H / 2 + 4} fontSize="8" fill="#9ca3af">t</text>
            {/* Continuous signal */}
            <polyline points={continuousPoints} fill="none" stroke="#94a3b8" strokeWidth="1.2" />
            {/* Samples */}
            {samples.map((s, i) => (
              <g key={i}>
                <line x1={s.x} y1={H / 2} x2={s.x} y2={s.y} stroke="#4f46e5" strokeWidth="1.5" />
                <circle cx={s.x} cy={s.y} r="2.5" fill="#4f46e5" />
              </g>
            ))}
          </svg>
        </div>

        {/* Frequency domain */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Frequency Domain (Sampled Spectrum)</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
            {/* Axis */}
            <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#e5e7eb" strokeWidth="0.5" />
            <text x={W - PAD + 4} y={H / 2 + 4} fontSize="8" fill="#9ca3af">f</text>
            {/* Nyquist markers */}
            {[-fs / 2, fs / 2].map((f, i) => {
              const x = PAD + ((f + 10) / 20) * (W - 2 * PAD)
              return x > PAD && x < W - PAD ? (
                <g key={i}>
                  <line x1={x} y1={10} x2={x} y2={H - 10} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3,3" />
                  <text x={x} y={H - 4} fontSize="7" fill="#ef4444" textAnchor="middle">
                    {f > 0 ? '+' : ''}{f.toFixed(1)}
                  </text>
                </g>
              ) : null
            })}
            {/* Original spectrum (light) */}
            <polyline points={spectrumContinuous} fill="none" stroke="#e2e8f0" strokeWidth="1" />
            {/* Aliased copies */}
            {aliasedSpectrum.map((pts, i) => (
              <polyline
                key={i}
                points={pts.join(' ')}
                fill="none"
                stroke={i === 2 ? '#4f46e5' : isAliasing ? '#ef4444' : '#a5b4fc'}
                strokeWidth={i === 2 ? '1.5' : '1'}
                opacity={i === 2 ? 1 : 0.5}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
