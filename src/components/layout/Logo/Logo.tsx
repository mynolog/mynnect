import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
})

type LogoProps = {
  type: 'full' | 'short'
}

export default function Logo({ type }: LogoProps) {
  return (
    <div
      className={`${righteous.className} w-64 h-16 flex justify-center items-center`}
      data-testid="logo"
    >
      <span className="text-7xl text-off-white-500">{type === 'full' ? 'mynnect.' : 'my.'}</span>
    </div>
  )
}
