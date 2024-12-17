'use client'

import BaseButton from '@/components/common/Button/BaseButton'
import BaseInput from '@/components/common/Input/BaseInput'
import Spinner from '@/components/common/Spinner/Spinner'
import { checkNickNameExist, socialSignupComplete } from '@/services/authServices'
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'
import { validateNickName } from '@/utils/validateUtils'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function SocialSignup() {
  const [nickName, setNickName] = useState('')
  const [isNickNameValid, setIsNickNameValid] = useState(false)
  const [isNickNameExist, setIsNickNameExist] = useState(false)
  const [isNickNameChecked, setIsNickNameChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const router = useRouter()

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target
    value = value.split(' ').join('')
    setNickName(value)

    if (value === '') {
      setIsNickNameValid(false)
    } else {
      setIsNickNameValid(validateNickName(value))
    }

    setIsNickNameChecked(false)
  }

  const handleCheckNickNameExist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsNickNameChecked(false)
    try {
      const result = await checkNickNameExist(nickName)
      setIsNickNameExist(result)
      setIsNickNameChecked(true)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSocialSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (user) {
      const result = await socialSignupComplete(nickName, user.uid)
      if (result) {
        mutate('users', result, false)
        setIsLoading(false)
        router.push('/home')
      }
    }
  }

  return (
    <form
      className="relative w-1/2 h-full flex flex-col items-center gap-5"
      onSubmit={handleSocialSignupSubmit}
    >
      <div className="flex items-center gap-3">
        <BaseInput
          name="nickName"
          type="text"
          placeholder="닉네임"
          value={nickName}
          onChange={handleNickNameChange}
          className={`${isNickNameChecked && isNickNameExist ? 'animate-shake border-red-700 focus:border-red-700' : 'border-lime-green-500 focus:border-lime-green-500'}`}
        />
        <BaseButton
          onClick={handleCheckNickNameExist}
          bgColor="bg-github-gray"
          textColor="text-off-white-500"
          disabled={!isNickNameValid}
        >
          {isNickNameChecked ? (isNickNameExist ? '사용 불가' : '사용 가능') : '중복확인'}
        </BaseButton>
      </div>

      <div className="w-full flex items-center gap-2">
        {isNickNameValid ? (
          <FaCheck className="text-lime-500" />
        ) : (
          <FaTimes className="text-red-700" />
        )}
        <span className={`${isNickNameValid ? 'text-lime-500' : 'text-red-700'} text-sm`}>
          영문자 소문자 또는 숫자를 포함하여 3자 이상
        </span>
      </div>

      <BaseButton
        className="absolute bottom-10"
        bgColor="bg-lime-green-900"
        textColor="text-off-white-500"
        disabled={isLoading || !isNickNameChecked || isNickNameExist}
      >
        {isLoading ? <Spinner /> : '가입하기'}
      </BaseButton>
    </form>
  )
}
