import { Noto_Sans_KR } from 'next/font/google'
import '../styles/globals.css'
import ReduxProvider from '@/components/providers/ReduxProvider'

const notoSansKR = Noto_Sans_KR({
  weight: '600',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <html lang="ko">
        <body className={`${notoSansKR.className} antialiased`}>
          {children}
        </body>
      </html>
    </ReduxProvider>
  )
}
