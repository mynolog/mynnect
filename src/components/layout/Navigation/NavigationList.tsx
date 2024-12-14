'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { RiAccountCircle2Line } from 'react-icons/ri'
import { navList } from '@/config/navList'
import AvatarImage from '@/components/common/Image/AvatarImage'
import { useUser } from '@/hooks/useUser'
import LogoutButton from '@/components/common/Button/LogoutButton'

export default function NavigationList() {
  const [isMounted, setIsMounted] = useState(false)
  const { user, isLoading } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const isProfileActive = pathname === `/profile/${user?.uid}`

  useEffect(() => {
    setIsMounted(true)
  }, [pathname])

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <ul className="w-full flex flex-col gap-3">
        {navList.map((item) => {
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
        {isLoading ? (
          <div className="flex px-3 mt-2 gap-3 w-full items-center animate-pulse">
            <div className="w-[22px] h-[22px] bg-gray-300 rounded-full"></div>
            프로필
          </div>
        ) : (
          user && (
            <li
              className={`${isProfileActive ? 'bg-lime-green-500 opacity-100 text-off-white-500' : 'opacity-80'}  flex px-4 w-full h-10 rounded-xl hover:bg-lime-green-500 hover:opacity-100 hover:text-off-white-500 hover:cursor-pointer transition-all duration-200 ease-linear`}
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
          )
        )}
      </ul>
      <div className="absolute bottom-10">
        <LogoutButton />
      </div>
    </>
  )
}
