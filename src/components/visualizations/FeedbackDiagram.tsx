'use client'

export default function FeedbackDiagram({ title }: { title?: string }) {
  return (
    <div className="my-8 flex justify-center">
      <div className="inline-block">
        {title && (
          <div className="text-[11px] font-medium text-slate-400 text-center mb-2">{title}</div>
        )}
        <svg viewBox="0 0 420 140" className="w-full max-w-md" style={{ maxHeight: 160 }}>
          {/* Summing junction */}
          <circle cx={80} cy={70} r={12} fill="none" stroke="#64748b" strokeWidth="1.5" />
          <text x={80} y={74} textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">+</text>
          <text x={72} y={100} textAnchor="middle" fontSize="9" fill="#ef4444">−</text>

          {/* Input arrow */}
          <line x1={20} y1={70} x2={68} y2={70} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x={20} y={62} fontSize="11" fill="#334155" fontWeight="600" fontStyle="italic">r</text>

          {/* Error signal */}
          <line x1={92} y1={70} x2={140} y2={70} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x={114} y={62} fontSize="9" fill="#64748b" fontStyle="italic">e</text>

          {/* Controller */}
          <rect x={140} y={50} width={60} height={40} rx={4} fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <text x={170} y={74} textAnchor="middle" fontSize="12" fill="#2563eb" fontWeight="600" fontStyle="italic">C(s)</text>

          {/* Controller to Plant */}
          <line x1={200} y1={70} x2={250} y2={70} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x={224} y={62} fontSize="9" fill="#64748b" fontStyle="italic">u</text>

          {/* Plant */}
          <rect x={250} y={50} width={60} height={40} rx={4} fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
          <text x={280} y={74} textAnchor="middle" fontSize="12" fill="#059669" fontWeight="600" fontStyle="italic">P(s)</text>

          {/* Output */}
          <line x1={310} y1={70} x2={400} y2={70} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x={395} y={62} fontSize="11" fill="#334155" fontWeight="600" fontStyle="italic">y</text>

          {/* Feedback path */}
          <circle cx={350} cy={70} r={2} fill="#334155" />
          <line x1={350} y1={70} x2={350} y2={120} stroke="#334155" strokeWidth="1.5" />
          <line x1={350} y1={120} x2={80} y2={120} stroke="#334155" strokeWidth="1.5" />
          <line x1={80} y1={120} x2={80} y2={82} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          {/* Arrowhead marker */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M 0 0 L 8 3 L 0 6 Z" fill="#334155" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  )
}
