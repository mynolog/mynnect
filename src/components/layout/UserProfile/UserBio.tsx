'use client'

import AvatarImage from '@/components/common/Image/AvatarImage'
import { useUser } from '@/hooks/useUser'

export default function UserBio() {
  const { user, isLoading } = useUser()

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-6 bg-gray-300 rounded-lg"></div>
          <div className="w-48 h-4 bg-gray-300 rounded-lg"></div>
        </div>
      ) : (
        user && (
          <>
            <AvatarImage
              src={user.photoURL}
              alt={user.name || 'Annonymous'}
              width={100}
              height={100}
              borderRadius="rounded-full"
            />
            <span className="text-2xl font-extrabold">{user.name || 'Annonymous'}</span>
            <span className="text-sm">{user.email || 'No email provided'}</span>
          </>
        )
      )}
    </>
  )
}
