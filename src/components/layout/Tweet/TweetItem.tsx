'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { MdOutlineDeleteForever, MdOutlineModeEditOutline, MdCheck, MdClose } from 'react-icons/md'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import type { Tweet } from '@/types/tweetTypes'
import AvatarImage from '../../common/Image/AvatarImage'
import { getTimeDifference } from '@/utils/getUtils'
import { useUser } from '@/hooks/useUser'
import { deleteTweet, updateTweet } from '@/services/tweetServices'
import Spinner from '@/components/common/Spinner/Spinner'
import { arrayRemove, arrayUnion, doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'

type TweetItemProps = {
  tweet: Tweet
}

export default function TweetItem({ tweet }: TweetItemProps) {
  const { user } = useUser()
  const [isAuthor, setIsAuthor] = useState(false)
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  const [newText, setNewText] = useState(tweet.text)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (user && user.uid === tweet.uid) {
      setIsAuthor(true)
    }
    adjustTextareaHeight()
  }, [user, tweet.uid])

  useEffect(() => {
    adjustTextareaHeight()
  }, [newText])

  useEffect(() => {
    if (user) {
      setIsLiked(tweet.likedBy.includes(user.uid))
    }
  }, [user, tweet.likedBy])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleDeleteTweetClick = async (docId: string) => {
    setIsLoading(true)
    try {
      const result = await deleteTweet(docId)
      if (result) {
        setIsLoading(true)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateTweetClick = () => {
    setIsUpdateMode(true)
    textareaRef.current?.focus()
  }

  const handleUpdateTweetCancelClick = () => {
    setIsUpdateMode(false)
    setNewText(tweet.text)
  }

  const handleUpdateTweetSubmitClick = async () => {
    if (newText.trim() === '') {
      return
    }
    setIsLoading(true)
    const newTweet: Tweet = {
      ...tweet,
      text: newText,
      updatedAt: Date.now(),
    }
    try {
      const result = await updateTweet(tweet.id, newTweet)
      if (result) {
        setIsUpdateMode(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value)
  }

  const handleToogleLike = async (id: string, uid: string, isLiked: boolean) => {
    const docRef = doc(db, 'tweets', id)

    if (isLiked) {
      await updateDoc(docRef, {
        likes: increment(-1),
        likedBy: arrayRemove(uid),
      })
    } else {
      await updateDoc(docRef, {
        likes: increment(1),
        likedBy: arrayUnion(uid),
      })
    }
  }

  return (
    <li className={`w-5/6 flex gap-4 transition-all duration-300 ease-linear animate-fade-in`}>
      <div className="flex items-start">
        <AvatarImage
          src={tweet.photoURL}
          alt={tweet.nickName}
          width={40}
          height={40}
          borderRadius="rounded-full"
        />
      </div>
      <div
        className={`flex flex-col justify-between gap-4 w-full h-auto outline-none rounded-2xl px-3 py-2 bg-white `}
      >
        <div className="flex justify-between gap-3">
          <textarea
            ref={textareaRef}
            maxLength={150}
            className={`w-full cursor-auto h-auto p-2 resize-none rounded-md  disabled:bg-white outline-none ${isUpdateMode ? 'border-2 border-steel-blue-600' : ''}`}
            onChange={handleTextareaChange}
            value={newText}
            disabled={!isUpdateMode}
          />

          {isAuthor && (
            <div className="flex gap-2">
              {isUpdateMode ? (
                <>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <MdCheck
                      className="text-2xl cursor-pointer text-lime-green-700 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-linear"
                      onClick={handleUpdateTweetSubmitClick}
                    />
                  )}
                  <MdClose
                    className="text-2xl cursor-pointer text-red-700 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-linear"
                    onClick={handleUpdateTweetCancelClick}
                  />
                </>
              ) : (
                <>
                  <MdOutlineModeEditOutline
                    className="text-2xl cursor-pointer text-steel-blue-600 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-linear"
                    onClick={handleUpdateTweetClick}
                  />
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <MdOutlineDeleteForever
                      className="text-2xl cursor-pointer text-red-700 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-linear"
                      onClick={() => handleDeleteTweetClick(tweet.id)}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex h-5 justify-between items-center gap-3">
          {user && (
            <div className="flex items-center justify-center gap-2">
              {isLiked ? (
                <FaHeart
                  onClick={() => handleToogleLike(tweet.id, user.uid, isLiked)}
                  className="cursor-pointer text-red-700 hover:scale-75 transition-all duration-200 ease-linear"
                />
              ) : (
                <FaRegHeart
                  onClick={() => handleToogleLike(tweet.id, user.uid, isLiked)}
                  className="cursor-pointer hover:text-red-700 hover:scale-125 transition-all duration-200 ease-linear"
                />
              )}
              <span className="text-xs text-native-gray-600 font-extrabold">{tweet.likes}</span>
            </div>
          )}
          <div className="flex gap-3">
            <span className="text-github-gray text-xs font-extrabold">{tweet.nickName}</span>
            <div className="flex flex-col items-end justify-center">
              <div className="text-native-gray-600 text-xs flex gap-1">
                <span>{getTimeDifference(tweet.createdAt)}</span>
                <span className="text-xs">{tweet.updatedAt !== 0 && <span>(수정됨)</span>}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
