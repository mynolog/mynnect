'use client'

import type { Tweet } from '@/types/tweetTypes'
import { useFirestoreData } from '@/hooks/useFirestoreData'
import AvatarImage from '../../common/Image/AvatarImage'
import { getTimeDifference } from '@/utils/getUtils'

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
            <li
              key={tweet.id}
              className={`w-5/6 flex gap-4 transition-all duration-300 ease-linear animate-fade-in
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
        </>
      )}
    </ul>
  )
}
