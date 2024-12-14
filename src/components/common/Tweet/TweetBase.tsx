import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import AvatarImage from '../Image/AvatarImage'
import { useUser } from '@/hooks/useUser'

type TweetBaseProps = {
  error: string
  setError: Dispatch<SetStateAction<string>>
  text: string
  setText: Dispatch<SetStateAction<string>>
}

export default function TweetBase({ error, setError, text, setText }: TweetBaseProps) {
  const { user, isLoading } = useUser()

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setError('')
    const { value } = e.target
    setText(value)
    const textarea = e.target
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  return (
    <div className="flex w-full justify-center items-center gap-4">
      {isLoading ? (
        <div className="flex animate-pulse">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
      ) : (
        <div className="flex">
          {user && (
            <AvatarImage
              src={user.photoURL}
              alt={user.displayName || 'Anonymous'}
              width={50}
              height={50}
              borderRadius="rounded-full"
            />
          )}
        </div>
      )}
      <textarea
        className={`w-full h-auto resize-none outline-none rounded-2xl px-3 py-2 ${error ? 'border-red-600 border-2 animate-shake' : ''}`}
        maxLength={180}
        value={text}
        onChange={handleInputChange}
        placeholder="지금 어떤 생각하시나요?"
      />
    </div>
  )
}
