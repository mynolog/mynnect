import '../styles/globals.css'
import ReduxProvider from '@/components/providers/ReduxProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <html lang="ko">
        <body className="antialiased">{children}</body>
      </html>
    </ReduxProvider>
  )
}
