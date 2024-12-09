'use client'

import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Logo from '../Logo/Logo'
import AvatarImage from '@/components/common/Image/AvatarImage'

export default function UserProfile() {
  const { user, isError, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading user data</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="fixed top-3 left-3 h-[97%] w-1/6 flex flex-col items-center gap-20 px-6 py-4 rounded-2xl border-4 border-lime-800 border-dashed font-bold text-md">
      <div>
        <div className="w-full h-20">
          <Logo type="short" textColor="lime-green-300" fontSize="text-5xl" />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <AvatarImage
            src={user.photoURL || ''}
            alt={user.name ?? 'Anonymous'}
            width={100}
            height={100}
            borderRadius="rounded-full"
          />
          <span className="text-2xl font-extrabold">{user.name}</span>
          <span className="text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  )
}
