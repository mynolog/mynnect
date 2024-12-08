import type { ReactNode } from 'react'

type BackgroundProps = {
  children: ReactNode
}

export default function Background({ children }: BackgroundProps) {
  return (
    <div className="relative bg-[url('/images/background.jpg')] bg-cover bg-center h-screen">
      <div className="absolute flex flex-col justify-evenly items-center inset-0 bg-black bg-opacity-50 backdrop-blur-lg">
        {children}
      </div>
    </div>
  )
}
