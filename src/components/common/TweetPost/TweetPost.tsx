'use client'

import { useUser } from '@/hooks/useUser'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import AvatarImage from '../Image/AvatarImage'
import BaseButton from '../Button/BaseButton'
import { createTweet } from '@/services/tweetServices'
import { Tweet } from '@/types/tweetTypes'
import Spinner from '../Spinner/Spinner'

export default function TweetPost() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useUser()

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setError('')
    const { value } = e.target
    setText(value)

    const textarea = e.target
    textarea.style.height = `${textarea.scrollHeight}px`
  }
  const handleTweetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') {
      setError('무엇을 공유하고 싶으신가요? 트윗 내용을 작성해 주세요.')
      return
    }
    try {
      setIsLoading(true)
      if (user) {
        const newTweet: Tweet = {
          uid: user.uid,
          name: user.name,
          text,
          createdAt: Date.now(),
          updatedAt: 0,
        }
        await createTweet(newTweet)
        setText('')
      }
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      setIsLoading(false)
    }
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
      <form onSubmit={handleTweetSubmit} className="flex flex-col items-end w-5/6 gap-4">
        <textarea
          className={`w-full h-auto resize-none outline-none rounded-2xl px-3 py-2 ${error ? 'border-red-600 border-2 animate-shake' : ''}`}
          maxLength={180}
          value={text}
          onChange={handleInputChange}
          placeholder="지금 어떤 생각하시나요?"
        />
        <div className={`w-full flex ${error ? 'justify-between' : 'justify-end'}`}>
          {error && <span className="pl-4 text-xs text-red-600">{error}</span>}
          <BaseButton
            height="h-8"
            bgColor="bg-lime-green-900"
            textColor="text-off-white-500"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : '올리기'}
          </BaseButton>
        </div>
      </form>
    </>
  )
}
