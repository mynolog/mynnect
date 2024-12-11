'use client'

import { mutate } from 'swr'
import { logout } from '@/services/authServices'
import BaseButton from './BaseButton'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
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

  return (
    <BaseButton
      onClick={handleLogout}
      textColor="text-off-white-500"
      width="w-28"
      height="h-8"
      bgColor="bg-github-gray"
    >
      <span className="text-sm">로그아웃</span>
    </BaseButton>
  )
}
