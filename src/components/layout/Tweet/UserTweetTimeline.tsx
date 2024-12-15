import { useEffect, useState } from 'react'
import TweetItem from './TweetItem'
import { Tweet } from '@/types/tweetTypes'
import { fetchTweetsByUid } from '@/services/tweetServices'

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
      {isLoading || !tweets.length ? (
        <div className="relative w-full h-screen flex flex-col gap-9">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-5/6 flex gap-4 animate-pulse">
              <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
              <div className="w-11/12 h-28 bg-gray-300 rounded-2xl"></div>
            </div>
          ))}
        </div>
      ) : (
        tweets.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)
      )}
    </ul>
  )
}
