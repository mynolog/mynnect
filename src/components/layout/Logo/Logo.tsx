'use client'

import { useRouter } from 'next/navigation'
import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
})

type LogoProps = {
  type: 'full' | 'short'
  textColor?: 'text-off-white-500' | 'text-lime-green-500' | 'text-lime-green-900'
  fontSize?: 'text-3xl' | 'text-5xl' | 'text-7xl'
}

export default function Logo({
  type,
  textColor = 'text-off-white-500',
  fontSize = 'text-7xl',
}: LogoProps) {
  const router = useRouter()

  return (
    <div className={`${righteous.className} flex justify-center items-center`} data-testid="logo">
      <span
        className={`${textColor} ${fontSize} hover:cursor-pointer opacity-85 scale-100 hover:opacity-100 hover:scale-105 transition-all duration-200 ease-linear`}
      >
        {type === 'full' ? 'mynnect.' : 'my.'}
      </span>
    </div>
  )
}
