import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import 'katex/dist/katex.min.css'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'ACE 335 — Mathematics of Engineering Systems',
    template: '%s | ACE 335',
  },
  description:
    'Comprehensive course reference for MTHE 335 / MATH 335: Mathematics of Engineering Systems at Queen\'s University. Full proofs, definitions, theorems, examples, and homework solutions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
