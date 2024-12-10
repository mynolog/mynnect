'use client'

import { useUser } from '@/hooks/useUser'
import Logo from '../Logo/Logo'
import AvatarImage from '@/components/common/Image/AvatarImage'
import BaseButton from '@/components/common/Button/BaseButton'
import { logout } from '@/services/authServices'
import { mutate } from 'swr'
import { useRouter } from 'next/navigation'

//TODO: photoURL = null 일 때 기본 프로필 이미지 불러오도록 수정 필요
export default function UserProfile() {
  const { user, isError, isLoading } = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result) {
        mutate('user', null, false)
        localStorage.removeItem('user')
        router.push('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (isError) {
    return <div>Error loading user data</div>
  }

  return (
    <div className="fixed top-3 left-3 h-[97%] w-1/6 flex flex-col items-center gap-8 px-6 py-4 rounded-xl border-4 border-lime-green-300 hover:border-lime-green-900 transition-colors ease-in-out duration-300 font-bold text-md">
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
                src={user.photoURL || ''}
                alt={user.name ?? 'Anonymous'}
                width={100}
                height={100}
                borderRadius="rounded-full"
              />
              <span className="text-2xl font-extrabold">{user.name}</span>
              <span className="text-sm">{user.email}</span>
            </>
          )
        )}
      </div>
      <div className="absolute bottom-7">
        <BaseButton
          onClick={handleLogout}
          bgColor="bg-lime-green-900"
          textColor="text-off-white-500"
        >
          로그아웃
        </BaseButton>
      </div>
    </div>
  )
}
