'use client'

import { useState, useEffect } from 'react'
import type { Tweet } from '@/types/tweetTypes'
import { useFirestoreData } from '@/hooks/useFirestoreData'
import AvatarImage from '../../common/Image/AvatarImage'
import { getTimeDifference } from '@/utils/getUtils'

export default function TweetTimeline() {
  const tweets: Tweet[] = useFirestoreData('tweets')
  const [newTweets, setNewTweets] = useState<string[]>([])

  useEffect(() => {
    if (tweets.length > 0) {
      const newTweetIds = tweets.map((tweet) => tweet.id).filter((id) => !newTweets.includes(id))
      if (newTweetIds.length > 0) {
        setNewTweets((prev) => [...prev, ...newTweetIds])
      }
    }
  }, [tweets, newTweets])

  return (
    <ul className="w-full mt-12 flex flex-col gap-8">
      {tweets.map((tweet) => (
        <li
          key={tweet.id}
          className={`w-5/6 flex gap-4 transition-all duration-300 ease-linear ${
            newTweets.includes(tweet.id) ? 'animate-fade-in' : ''
          }`}
        >
          <div className="flex items-start">
            <AvatarImage
              src={tweet.photoURL}
              alt={tweet.name}
              width={40}
              height={40}
              borderRadius="rounded-full"
            />
          </div>
          <div
            className={`flex flex-col justify-between gap-4 w-full h-auto resize-none outline-none rounded-2xl px-3 py-2 bg-white`}
          >
            <p>{tweet.text}</p>
            <div className="flex justify-end gap-3">
              <span className="text-github-gray text-xs">{tweet.name}</span>
              <span className="text-native-gray-600 text-xs">
                {getTimeDifference(tweet.createdAt)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
