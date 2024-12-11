'use client'

import { useUser } from '@/hooks/useUser'
import Logo from '../Logo/Logo'
import AvatarImage from '@/components/common/Image/AvatarImage'

export default function UserProfile() {
  const { user, isError, isLoading } = useUser()

  if (isError) {
    return <div>Error loading user data</div>
  }

  return (
    <div className="fixed top-3 left-3 h-[97%] w-1/6 flex flex-col items-center gap-8 px-6 py-4 rounded-xl border-4 border-lime-green-500 hover:border-lime-green-900 transition-colors ease-in-out duration-300 font-bold text-md">
      <div className="w-full h-20">
        <Logo type="short" textColor="text-lime-green-500" fontSize="text-5xl" />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div className="w-32 h-6 bg-gray-300 rounded"></div>
            <div className="w-48 h-4 bg-gray-300 rounded"></div>
          </div>
        ) : (
          user && (
            <>
              <AvatarImage
                src={user.photoURL}
                alt={user.name || 'User Avatar'}
                width={100}
                height={100}
                borderRadius="rounded-full"
              />

              <span className="text-2xl font-extrabold">{user.name || 'Anonymous'}</span>
              <span className="text-sm">{user.email || 'No email provided'}</span>
            </>
          )
        )}
      </div>
    </div>
  )
}
