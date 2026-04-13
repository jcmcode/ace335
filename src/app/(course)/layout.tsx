import Sidebar from '@/components/layout/Sidebar'

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Sidebar />
      <main className="lg:pl-60">
        <div className="max-w-3xl mx-auto px-5 py-12 sm:px-8 lg:px-12">
          {children}
        </div>
      </main>
    </div>
  )
}
