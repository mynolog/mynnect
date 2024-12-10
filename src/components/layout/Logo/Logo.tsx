'use client'

import { useRouter } from 'next/navigation'
import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
})

type LogoProps = {
  type: 'full' | 'short'
  textColor?: 'text-off-white-500' | 'text-lime-green-500'
  fontSize?: 'text-3xl' | 'text-5xl' | 'text-7xl'
}

export default function Logo({
  type,
  textColor = 'text-off-white-500',
  fontSize = 'text-7xl',
}: LogoProps) {
  const router = useRouter()

  const navigateToHome = () => {
    router.push('/home')
  }
  return (
    <div
      className={`${righteous.className} flex justify-center items-center`}
      onClick={navigateToHome}
      data-testid="logo"
    >
      <span
        className={`${textColor} ${fontSize} hover:text-lime-green-900 transition-colors duration-300 ease-linear hover:cursor-pointer`}
      >
        {type === 'full' ? 'mynnect.' : 'my.'}
      </span>
    </div>
  )
}
