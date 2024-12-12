'use client'

import type { Tweet } from '@/types/tweetTypes'
import { useFirestoreData } from '@/hooks/useFirestoreData'
import TweetItem from './TweetItem'

export default function TweetTimeline() {
  const { data: tweets, isLoading }: { data: Tweet[]; isLoading: boolean } =
    useFirestoreData('tweets')

  return (
    <ul className="w-full mt-12 flex flex-col gap-8">
      {isLoading ? (
        <div className="relative w-full h-screen flex flex-col gap-9">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="w-5/6 flex gap-4 animate-pulse">
              <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
              <div className="w-11/12 h-16 bg-gray-300 rounded-2xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {tweets.map((tweet) => (
            <TweetItem key={tweet.id} tweet={tweet} />
          ))}
        </>
      )}
    </ul>
  )
}
