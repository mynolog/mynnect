'use client'
import UserTweetTimeline from '@/components/layout/Tweet/UserTweetTimeline'
import UserBio from '@/components/layout/UserProfile/UserBio'
import { useUser } from '@/hooks/useUser'

export default function ProfileDetail() {
  //TODO: nickname param 기반으로 렌더링하는 방식으로 수정
  const { user, isLoading } = useUser()

  return (
    <div className="w-full flex flex-col items-center">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-6 bg-gray-300 rounded-lg"></div>
          <div className="w-48 h-4 bg-gray-300 rounded-lg"></div>
        </div>
      ) : (
        user && <UserBio uid={user.uid} isEditable={true} />
      )}
      <div className="w-full flex flex-col justify-center items-center mt-16">
        {user && <UserTweetTimeline uid={user.uid} />}
      </div>
    </div>
  )
}
