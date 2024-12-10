'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RiAccountCircle2Line } from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
import AvatarImage from '@/components/common/Image/AvatarImage'
import { useUser } from '@/hooks/useUser'
import { navigationList } from '@/config/NavigationList'

export default function Navigation() {
  const [isMounted, setIsMounted] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <nav className="fixed top-3 right-3 h-[97%] w-1/6 flex flex-col items-center gap-20 px-3 py-4 rounded-xl border-4 border-lime-green-300 hover:border-lime-green-900 transition-colors ease-in-out duration-300 font-bold text-md">
      <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          className="w-40 rounded-tl-full rounded-bl-full px-4 py-2"
          placeholder="검색"
        />
        <FaSearch className="text-lime-green-900" />
      </div>
      <ul className="w-full flex flex-col gap-3">
        {navigationList.map((item) => (
          <li
            key={`${item.id}-${item.label}`}
            className="flex px-3 w-full h-10 rounded-xl opacity-80 hover:bg-lime-green-300 hover:opacity-95 hover:cursor-pointer transition-all duration-200 ease-linear"
          >
            <Link href={item.href} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-bold">{item.label}</span>
            </Link>
          </li>
        ))}
        <li className="flex px-3 w-full h-10 rounded-xl opacity-80 hover:bg-lime-green-300 hover:opacity-100 transition-all duration-200 ease-linear">
          <Link href={`/profile/${user?.uid}`} className="flex items-center gap-2">
            {user && isMounted ? (
              <AvatarImage
                borderRadius="rounded-full"
                src={user.photoURL}
                alt={user.name}
                width={22}
                height={22}
              />
            ) : (
              <RiAccountCircle2Line className="text-2xl" />
            )}
            프로필
          </Link>
        </li>
      </ul>
    </nav>
  )
}
