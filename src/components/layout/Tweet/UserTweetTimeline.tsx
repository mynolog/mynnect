import { useEffect, useState } from 'react'
import TweetItem from './TweetItem'
import { Tweet } from '@/types/tweetTypes'
import { fetchTweetsByUid } from '@/services/tweetServices'
import { LuBird } from 'react-icons/lu'

export default function UserTweetTimeline({ uid }: { uid: string }) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTweets = async () => {
      if (uid) {
        setIsLoading(true)
        const data = await fetchTweetsByUid(uid)
        setTweets(data)
      }
      setIsLoading(false)
    }
    fetchTweets()
  }, [uid])

  return (
    <ul className="w-full mt-12 flex flex-col gap-8">
      {isLoading ? (
        <div className="relative w-full h-screen flex flex-col gap-9">
          {Array.from({ length: tweets.length }, (_, index) => (
            <div key={index} className="w-5/6 flex gap-4 animate-pulse">
              <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
              <div className="w-11/12 h-28 bg-gray-300 rounded-2xl"></div>
            </div>
          ))}
        </div>
      ) : tweets.length === 0 ? (
        <div className="w-full flex flex-col text-github-gray justify-center items-center">
          <LuBird className="text-8xl" />
          <span className="text-center font-bold">첫 번째 트윗을 공유해주세요 :)</span>
        </div>
      ) : (
        tweets.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)
      )}
    </ul>
  )
}
