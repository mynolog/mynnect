import { cookies } from 'next/headers'
import { Noto_Sans_KR } from 'next/font/google'
import '../styles/globals.css'
import ThemeToggler from '@/components/layout/ThemeToggler/ThemeToggler'

const notoSansKR = Noto_Sans_KR({
  weight: '600',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const themeCookie = cookieStore.get('theme')

  const initialTheme = themeCookie?.value === 'dark' ? 'dark' : 'light'

  return (
    <html lang="ko" className={initialTheme}>
      <body className={`${notoSansKR.className} antialiased`}>
        <ThemeToggler initialTheme={initialTheme} />
        {children}
      </body>
    </html>
  )
}
