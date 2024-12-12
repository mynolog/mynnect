'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

type PublicRouteProps = {
  children: ReactNode
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user) {
      router.push('/home')
    }
  }, [mounted, user, router])

  if (!mounted || user) {
    return null
  }
  return <>{children}</>
}
