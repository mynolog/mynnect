'use client'

import AvatarImage from '@/components/common/Image/AvatarImage'
import Spinner from '@/components/common/Spinner/Spinner'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { updateUserProfile } from '@/services/authServices'
import { ChangeEvent, useEffect, useState } from 'react'
import { MdOutlineModeEditOutline, MdCheck, MdClose } from 'react-icons/md'

type UserBioProps = {
  uid: string
  isEditable?: boolean
}

export default function UserBio({ uid, isEditable = false }: UserBioProps) {
  const { user, isLoading } = useCurrentUser(uid)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName)

  useEffect(() => {
    if (user) {
      setNewDisplayName(user.displayName)
    }
  }, [user])

  const handleEditButtonClick = () => {
    setIsEditMode(true)
  }
  const handleCancelEditButtonClick = () => {
    setNewDisplayName(user?.displayName)
    setIsEditMode(false)
  }
  const handleConfirmEditButtonClick = async () => {
    //TODO: 공백 제출 시 에러 핸들링 처리 필요
    if (newDisplayName === '' || newDisplayName?.trim() === '') {
      return
    }
    setIsSubmitLoading(true)
    if (newDisplayName) {
      try {
        await updateUserProfile(uid, newDisplayName)
        setIsEditMode(false)
      } catch (e) {
        console.error(e)
      } finally {
        setIsSubmitLoading(false)
      }
    }
  }
  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setNewDisplayName(value)
  }

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-6 bg-gray-300 rounded-lg"></div>
          <div className="w-48 h-4 bg-gray-300 rounded-lg"></div>
        </div>
      ) : (
        user && (
          <div className="flex flex-col gap-2 justify-center items-center">
            <AvatarImage
              src={user.photoURL}
              alt={user.displayName || 'Annonymous'}
              width={100}
              height={100}
              borderRadius="rounded-full"
            />
            <div className="w-full flex items-center gap-3 text-2xl font-extrabold mt-2">
              {isEditable && isEditMode ? (
                <input
                  className="rounded-xl text-sm p-2 outline-none focus:border-2 focus:border-steel-blue-600"
                  value={newDisplayName || ''}
                  onChange={handleDisplayNameChange}
                />
              ) : (
                <p className="min-w-full">{user.displayName || 'Anonymous'}</p>
              )}
              <div className="flex w-full">
                {isEditable && (
                  <>
                    {isEditMode ? (
                      <div className="flex justify-end">
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <MdCheck
                            onClick={handleConfirmEditButtonClick}
                            className="cursor-pointer text-lime-green-700 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-linear"
                          />
                        )}
                        <MdClose
                          onClick={handleCancelEditButtonClick}
                          className="cursor-pointer text-red-700 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-linear"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <MdOutlineModeEditOutline
                          onClick={handleEditButtonClick}
                          className="cursor-pointer text-steel-blue-600  opacity-70 hover:opacity-100 transition-opacity duration-200 ease-linear"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <span className="text-sm">@{user.nickName || 'Annonymous'}</span>
          </div>
        )
      )}
    </>
  )
}
