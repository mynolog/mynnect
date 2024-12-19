'use client'

import { useUser } from '@/hooks/useUser'
import { type FormEvent, useState } from 'react'
import BaseButton from '../../common/Button/BaseButton'
import { createTweet } from '@/services/tweetServices'
import { Tweet } from '@/types/tweetTypes'
import Spinner from '../../common/Spinner/Spinner'
import TweetBase from '../../common/Tweet/TweetBase'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export default function TweetPost() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useUser()
  const { user: currentUser } = useCurrentUser(user?.uid as string)

  const handleTweetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') {
      setError('무엇을 공유하고 싶으신가요? 트윗 내용을 작성해 주세요.')
      return
    }
    try {
      setIsLoading(true)
      if (currentUser) {
        const newTweet: Tweet = {
          id: '0',
          uid: currentUser.uid,
          nickName: currentUser.nickName || 'Anonymous',
          photoURL: currentUser.photoURL,
          text,
          createdAt: Date.now(),
          updatedAt: 0,
          likes: 0,
          likedBy: [],
        }
        const result = await createTweet(newTweet)
        if (!result) {
          setError('트윗을 등록할 수 없습니다. 잠시후 다시 시도해주세요.')
        }
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
    <form onSubmit={handleTweetSubmit} className="flex flex-col items-end w-5/6 gap-4">
      <TweetBase error={error} setError={setError} text={text} setText={setText} />
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
  )
}
