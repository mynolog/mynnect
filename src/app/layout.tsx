import '../styles/globals.css'
import ReduxProvider from '@/components/providers/ReduxProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <html lang="ko">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Righteous&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="antialiased">{children}</body>
      </html>
    </ReduxProvider>
  )
}
