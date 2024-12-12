'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

type PrivateRouteProps = {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !user) {
      router.push('/')
    }
  }, [mounted, user, router])

  if (!mounted || !user) {
    return null
  }
  return <>{children}</>
}
