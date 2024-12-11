import { Noto_Sans_KR } from 'next/font/google'
import '../styles/globals.css'
import ReduxProvider from '@/components/providers/ReduxProvider'

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata = {
  title: '환영합니다:) | mynnect.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} antialiased relative`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
