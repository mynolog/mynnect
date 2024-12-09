import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
})

type LogoProps = {
  type: 'full' | 'short'
  textColor?: 'text-off-white-500' | 'lime-green-300'
  fontSize?: 'text-5xl' | 'text-7xl'
}

export default function Logo({
  type,
  textColor = 'text-off-white-500',
  fontSize = 'text-7xl',
}: LogoProps) {
  return (
    <div className={`${righteous.className} flex justify-center items-center`} data-testid="logo">
      <span className={`${textColor} ${fontSize}`}>{type === 'full' ? 'mynnect.' : 'my.'}</span>
    </div>
  )
}
