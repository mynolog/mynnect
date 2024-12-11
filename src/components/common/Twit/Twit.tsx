'use client'

import { useUser } from '@/hooks/useUser'
import { type ChangeEvent, useState } from 'react'
import AvatarImage from '../Image/AvatarImage'
import BaseButton from '../Button/BaseButton'

export default function Twit() {
  const [text, setText] = useState('')
  const { user } = useUser()

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)

    const textarea = e.target
    textarea.style.height = `${textarea.scrollHeight}px`
  }
  return (
    <>
      <div className="absolute top-0 left-0 flex">
        {user && (
          <AvatarImage
            src={user.photoURL}
            alt={user.name}
            width={50}
            height={50}
            borderRadius="rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col items-end w-5/6 gap-4">
        <textarea
          className="w-full h-auto resize-none outline-none rounded-2xl px-3 py-2 focus:border-lime-green-500 transition-colors duration-100 ease-linear"
          maxLength={180}
          value={text}
          onChange={handleInputChange}
          placeholder="지금 어떤 생각하시나요?"
        />
        <BaseButton height="h-8" bgColor="bg-github-gray" textColor="text-off-white-500">
          올리기
        </BaseButton>
      </div>
    </>
  )
}
