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
  group: 'foundations' | 'structure' | 'convergence' | 'calculus' | 'integration'
}

interface Edge {
  from: number
  to: number
}

const nodes: Node[] = [
  { id: 1, label: 'Topological Spaces', short: '1', slug: 'topological-spaces', x: 400, y: 30, group: 'foundations' },
  { id: 2, label: 'Metric Spaces', short: '2', slug: 'metric-spaces', x: 400, y: 115, group: 'foundations' },
  { id: 3, label: 'Interior & Closure', short: '3', slug: 'interior-closure-boundary', x: 200, y: 200, group: 'structure' },
  { id: 4, label: 'Continuity', short: '4', slug: 'continuity', x: 600, y: 200, group: 'structure' },
  { id: 5, label: 'Sequences', short: '5', slug: 'sequences-convergence', x: 300, y: 290, group: 'convergence' },
  { id: 6, label: 'Completeness', short: '6', slug: 'completeness', x: 500, y: 290, group: 'convergence' },
  { id: 7, label: 'Compactness', short: '7', slug: 'compactness', x: 150, y: 380, group: 'structure' },
  { id: 8, label: 'Connectedness', short: '8', slug: 'connectedness', x: 300, y: 380, group: 'structure' },
  { id: 9, label: 'Partial Derivs', short: '9', slug: 'partial-derivatives', x: 500, y: 380, group: 'calculus' },
  { id: 10, label: 'Implicit Function', short: '10', slug: 'implicit-function', x: 650, y: 380, group: 'calculus' },
  { id: 11, label: 'Taylor & Extrema', short: '11', slug: 'multivariable-differentiation', x: 420, y: 470, group: 'calculus' },
  { id: 12, label: 'Lagrange', short: '12', slug: 'lagrange-multipliers', x: 570, y: 470, group: 'calculus' },
  { id: 13, label: 'Integration', short: '13', slug: 'integration-measure', x: 720, y: 470, group: 'integration' },
]

const edges: Edge[] = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 3, to: 7 },
  { from: 4, to: 5 },
  { from: 4, to: 6 },
  { from: 4, to: 9 },
  { from: 5, to: 6 },
  { from: 5, to: 7 },
  { from: 5, to: 8 },
  { from: 6, to: 9 },
  { from: 7, to: 11 },
  { from: 9, to: 10 },
  { from: 9, to: 11 },
  { from: 10, to: 11 },
  { from: 10, to: 12 },
  { from: 11, to: 12 },
  { from: 6, to: 13 },
]

const groupColors: Record<string, { fill: string; stroke: string; text: string; glow: string }> = {
  foundations: { fill: '#1e3a5f', stroke: '#3b82f6', text: '#93c5fd', glow: 'rgba(59,130,246,0.15)' },
  structure: { fill: '#4b1d2b', stroke: '#f43f5e', text: '#fda4af', glow: 'rgba(244,63,94,0.15)' },
  convergence: { fill: '#133e3e', stroke: '#14b8a6', text: '#5eead4', glow: 'rgba(20,184,166,0.15)' },
  calculus: { fill: '#401e3e', stroke: '#d946ef', text: '#f0abfc', glow: 'rgba(217,70,239,0.15)' },
  integration: { fill: '#4a2b14', stroke: '#fb923c', text: '#fed7aa', glow: 'rgba(251,146,60,0.15)' },
}

const groupLabelsList = [
  { label: 'Foundations', color: '#3b82f6' },
  { label: 'Structural Properties', color: '#f43f5e' },
  { label: 'Convergence', color: '#14b8a6' },
  { label: 'Multivariable Calculus', color: '#d946ef' },
  { label: 'Integration & Measure', color: '#fb923c' },
]

export default function CourseMindmap328() {
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
      <div className="flex justify-center flex-wrap gap-4 mb-4">
        {groupLabelsList.map(g => (
          <div key={g.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
            <span className="text-[11px] text-slate-400">{g.label}</span>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 800 560" className="w-full" style={{ maxHeight: 460 }}>
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

        {nodes.map(node => {
          const colors = groupColors[node.group]
          const isActive = !activeSet || activeSet.has(node.id)
          const isHovered = hovered === node.id
          return (
            <Link key={node.id} href={`/328/chapters/${node.slug}`}>
              <g
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.25, transition: 'opacity 0.15s' }}
              >
                {isHovered && (
                  <circle cx={node.x} cy={node.y} r={38} fill={colors.glow} />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 26 : 22}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isHovered ? 2 : 1.5}
                  style={{ transition: 'r 0.15s' }}
                />
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
