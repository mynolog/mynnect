import { Noto_Sans_KR } from 'next/font/google'
import '../styles/globals.css'
import ReduxProvider from '@/components/providers/ReduxProvider'
import Modal from '@/components/common/Modal/Modal'

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '500', '700', '900'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} antialiased`}>
        <ReduxProvider>
          {children}
          <Modal />
        </ReduxProvider>
      </body>
    </html>
  )
}
