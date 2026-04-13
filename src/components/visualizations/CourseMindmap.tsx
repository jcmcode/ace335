'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Node {
  id: number
  label: string
  short: string
  slug: string
  x: number
  y: number
  group: 'foundations' | 'transforms' | 'control' | 'advanced'
}

interface Edge {
  from: number
  to: number
  label?: string
}

const nodes: Node[] = [
  { id: 1, label: 'Introduction', short: '1', slug: 'introduction', x: 400, y: 40, group: 'foundations' },
  { id: 2, label: 'Signal Spaces', short: '2', slug: 'signal-spaces', x: 200, y: 120, group: 'foundations' },
  { id: 3, label: 'Distributions', short: '3', slug: 'dual-spaces', x: 120, y: 220, group: 'foundations' },
  { id: 4, label: 'Systems', short: '4', slug: 'systems', x: 580, y: 120, group: 'transforms' },
  { id: 5, label: 'Fourier', short: '5', slug: 'fourier', x: 280, y: 260, group: 'transforms' },
  { id: 6, label: 'Freq. Domain', short: '6', slug: 'frequency-domain', x: 460, y: 260, group: 'transforms' },
  { id: 7, label: 'Laplace / Z', short: '7', slug: 'laplace-z', x: 620, y: 260, group: 'transforms' },
  { id: 8, label: 'Control Design', short: '8', slug: 'control-frequency', x: 700, y: 360, group: 'control' },
  { id: 9, label: 'State Space', short: '9', slug: 'state-space', x: 520, y: 370, group: 'control' },
  { id: 10, label: 'Sampling', short: '10', slug: 'sampling', x: 340, y: 370, group: 'control' },
  { id: 11, label: 'Stability', short: '11', slug: 'stability', x: 460, y: 460, group: 'advanced' },
  { id: 12, label: 'Controllability', short: '12', slug: 'controllability', x: 620, y: 460, group: 'advanced' },
]

const edges: Edge[] = [
  { from: 1, to: 2 },
  { from: 1, to: 4 },
  { from: 2, to: 3 },
  { from: 2, to: 5 },
  { from: 3, to: 5 },
  { from: 4, to: 6 },
  { from: 4, to: 7 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 8 },
  { from: 7, to: 9 },
  { from: 5, to: 10 },
  { from: 8, to: 9 },
  { from: 9, to: 11 },
  { from: 9, to: 12 },
  { from: 11, to: 12 },
]

const groupColors: Record<string, { fill: string; stroke: string; text: string; glow: string }> = {
  foundations: { fill: '#1e3a5f', stroke: '#3b82f6', text: '#93c5fd', glow: 'rgba(59,130,246,0.15)' },
  transforms: { fill: '#1a3a2a', stroke: '#10b981', text: '#6ee7b7', glow: 'rgba(16,185,129,0.15)' },
  control: { fill: '#3a2e1a', stroke: '#f59e0b', text: '#fcd34d', glow: 'rgba(245,158,11,0.15)' },
  advanced: { fill: '#2d1f4e', stroke: '#8b5cf6', text: '#c4b5fd', glow: 'rgba(139,92,246,0.15)' },
}

const groupLabels = [
  { label: 'Foundations', color: '#3b82f6' },
  { label: 'Systems & Transforms', color: '#10b981' },
  { label: 'Control & Design', color: '#f59e0b' },
  { label: 'Advanced', color: '#8b5cf6' },
]

export default function CourseMindmap() {
  const [hovered, setHovered] = useState<number | null>(null)

  const connectedTo = (id: number) => {
    const connected = new Set<number>()
    connected.add(id)
    edges.forEach(e => {
      if (e.from === id) connected.add(e.to)
      if (e.to === id) connected.add(e.from)
    })
    return connected
  }

  const activeSet = hovered ? connectedTo(hovered) : null

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Legend */}
      <div className="flex justify-center gap-5 mb-4">
        {groupLabels.map(g => (
          <div key={g.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
            <span className="text-[11px] text-slate-400">{g.label}</span>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 800 510" className="w-full" style={{ maxHeight: 420 }}>
        {/* Edges */}
        {edges.map((e, i) => {
          const from = nodes.find(n => n.id === e.from)!
          const to = nodes.find(n => n.id === e.to)!
          const isActive = !activeSet || (activeSet.has(e.from) && activeSet.has(e.to))
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isActive ? '#475569' : '#1e293b'}
              strokeWidth={isActive ? 1.5 : 0.5}
              opacity={isActive ? 0.6 : 0.2}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const colors = groupColors[node.group]
          const isActive = !activeSet || activeSet.has(node.id)
          const isHovered = hovered === node.id
          return (
            <Link key={node.id} href={`/chapters/${node.slug}`}>
              <g
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.25, transition: 'opacity 0.15s' }}
              >
                {/* Glow */}
                {isHovered && (
                  <circle cx={node.x} cy={node.y} r={38} fill={colors.glow} />
                )}
                {/* Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 26 : 22}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isHovered ? 2 : 1.5}
                  style={{ transition: 'r 0.15s' }}
                />
                {/* Number */}
                <text
                  x={node.x}
                  y={node.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={colors.text}
                >
                  {node.short}
                </text>
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + 36}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isActive ? '#94a3b8' : '#334155'}
                  fontWeight={isHovered ? '600' : '400'}
                >
                  {node.label}
                </text>
              </g>
            </Link>
          )
        })}
      </svg>
    </div>
  )
}
