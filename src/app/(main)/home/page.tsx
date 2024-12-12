import TweetPost from '@/components/layout/Tweet/TweetPost'
import TweetTimeline from '@/components/layout/Tweet/TweetTimeline'

export const metadata = {
  title: '홈 | mynnect.',
}

export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <TweetPost />
      <TweetTimeline />
    </div>
  )
}
