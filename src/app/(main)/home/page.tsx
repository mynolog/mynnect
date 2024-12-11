import TweetPost from '@/components/common/TweetPost/TweetPost'

export const metadata = {
  title: '홈 | mynnect.',
}

export default function Home() {
  return (
    <div className="relative flex justify-center items-center">
      <TweetPost />
    </div>
  )
}
