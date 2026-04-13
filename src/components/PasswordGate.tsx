'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ace335-exam-access'
// Simple hash so the password isn't in plain text in the bundle
const PASS_HASH = '718412fcd00cf499f6b89f5ac422dad7e263b172ac607472c1d7fcb20d97dc08' // sha256 of 'ace335'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function PasswordGate({
  children,
  hash,
}: {
  children: React.ReactNode
  hash?: string
}) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  const targetHash = hash || PASS_HASH

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === targetHash) {
      setUnlocked(true)
    }
  }, [targetHash])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const h = await hashPassword(input)
    if (h === targetHash) {
      localStorage.setItem(STORAGE_KEY, targetHash)
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!mounted) return null

  if (unlocked) return <>{children}</>

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-3">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Exam Content Protected</h2>
          <p className="text-sm text-slate-500 mt-1">Enter the password to access past exams and solutions.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            placeholder="Password"
            className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              error
                ? 'border-red-300 focus:ring-red-200'
                : 'border-slate-200 focus:ring-indigo-200 focus:border-indigo-300'
            }`}
            autoFocus
          />
          {error && <p className="text-xs text-red-500">Incorrect password.</p>}
          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}
