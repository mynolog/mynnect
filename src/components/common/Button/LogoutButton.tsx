'use client'

import { mutate } from 'swr'
import { logout } from '@/services/authServices'
import BaseButton from './BaseButton'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { LuLogOut } from 'react-icons/lu'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result) {
        mutate('user', null, false)
        localStorage.removeItem('user')
        Cookies.remove('token')
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
      width="w-16"
      height="h-8"
      bgColor="bg-github-gray"
    >
      <LuLogOut className="text-lg font-extrabold block md:hidden" />
      <span className="text-xs font-extrabold hidden md:inline">로그아웃</span>
    </BaseButton>
  )
}
