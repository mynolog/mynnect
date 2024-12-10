'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  RiHomeLine,
  RiNotification4Line,
  RiArrowRightUpLine,
  RiEarthFill,
  RiAccountCircle2Line,
} from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
import AvatarImage from '@/components/common/Image/AvatarImage'
import { useUser } from '@/hooks/useUser'

export default function Navigation() {
  const [isMounted, setIsMounted] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <nav className="fixed top-3 right-3 h-[97%] w-1/6 flex flex-col items-center gap-20 px-6 py-4 rounded-xl border-4 border-lime-green-300 hover:border-lime-green-900 transition-colors ease-in-out duration-300 font-bold text-md">
      <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          className="w-40 rounded-tl-full rounded-bl-full px-4 py-2"
          placeholder="검색"
        />
        <FaSearch className="text-lime-green-900" />
      </div>
      <ul className="w-full flex flex-col gap-10">
        <li className="w-full">
          <Link href="/home" className="flex items-center gap-2">
            <RiHomeLine className="text-2xl" />홈
          </Link>
        </li>
        <li className="w-full">
          <Link href="/explore" className="flex items-center gap-2">
            <RiEarthFill className="text-2xl" />
            탐색
          </Link>
        </li>
        <li className="w-full">
          <Link href="/trend" className="flex items-center gap-2">
            <RiArrowRightUpLine className="text-2xl" />
            트렌드
          </Link>
        </li>
        <li className="w-full">
          <Link href="/notification" className="flex items-center gap-2">
            <RiNotification4Line className="text-2xl" />
            알림
          </Link>
        </li>
        <li className="w-full">
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
