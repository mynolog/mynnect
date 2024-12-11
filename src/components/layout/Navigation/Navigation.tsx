'use client'

import { useEffect, useState } from 'react'
import { mutate } from 'swr'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { RiAccountCircle2Line } from 'react-icons/ri'
import { LuLogOut } from 'react-icons/lu'
import AvatarImage from '@/components/common/Image/AvatarImage'
import { useUser } from '@/hooks/useUser'
import { navigationList } from '@/config/navigationList'
import BaseButton from '@/components/common/Button/BaseButton'
import { logout } from '@/services/authServices'

export default function Navigation() {
  const [isMounted, setIsMounted] = useState(false)
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const isProfileActive = pathname === `/profile/${user?.uid}`

  useEffect(() => {
    setIsMounted(true)
  }, [pathname])

  const handleNavigation = (href: string) => {
    router.push(href)
  }

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
    <nav className="fixed top-3 right-3 h-[97%] w-1/6 flex flex-col items-center gap-20 px-3 py-4 rounded-xl border-4 border-lime-green-500 hover:border-lime-green-900 transition-colors ease-in-out duration-300 font-bold text-md">
      <ul className="w-full flex flex-col gap-3">
        {navigationList.map((item) => {
          const isActive = pathname === item.href

          return (
            <li
              key={`${item.id}-${item.label}`}
              onClick={() => handleNavigation(item.href)}
              className={`${isActive ? 'bg-lime-green-500 opacity-100 text-off-white-500' : 'opacity-80'} flex px-3 w-full h-10 rounded-xl hover:bg-lime-green-500 hover:opacity-95 hover:text-off-white-500 hover:cursor-pointer transition-all duration-200 ease-linear`}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-bold">{item.label}</span>
              </Link>
            </li>
          )
        })}
        {user && (
          <li
            className={`${isProfileActive ? 'bg-lime-green-500 opacity-100 text-off-white-500' : 'opacity-80'} flex px-3 w-full h-10 rounded-xl hover:bg-lime-green-500 hover:opacity-100 hover:text-off-white-500 hover:cursor-pointer transition-all duration-200 ease-linear`}
            onClick={() => handleNavigation(`/profile/${user.uid}`)}
          >
            <Link href={`/profile/${user?.uid}`} className="flex items-center gap-2">
              {user && isMounted ? (
                <AvatarImage
                  borderRadius="rounded-full"
                  src={user.photoURL}
                  alt={user.name}
                  width={22}
                  height={22}
                  fontSize="text-xl"
                />
              ) : (
                <RiAccountCircle2Line className="text-2xl" />
              )}
              프로필
            </Link>
          </li>
        )}
      </ul>
      <div className="absolute bottom-7">
        <BaseButton
          onClick={handleLogout}
          bgColor="bg-lime-green-900"
          textColor="text-off-white-500"
          width="w-44"
        >
          로그아웃
          <LuLogOut />
        </BaseButton>
      </div>
    </nav>
  )
}
