'use client'

import BaseButton from '@/components/common/Button/BaseButton'
import BaseInput from '@/components/common/Input/BaseInput'
import Spinner from '@/components/common/Spinner/Spinner'
import { useForm } from '@/hooks/useForm'
import { socialSignupComplete } from '@/services/authServices'
import { FormEvent, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

export default function SocialSignup() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const { form, handleFormChange } = useForm({
    nickName: '',
  })
  const router = useRouter()

  const handleSocialSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (user) {
      const result = await socialSignupComplete(form.nickName, user.uid)
      if (result) {
        mutate('users', result, false)
        setIsLoading(false)
        router.push('/home')
      }
    }
  }

  return (
    <form
      className="w-1/2 flex flex-col justify-center items-center gap-5"
      onSubmit={handleSocialSignupSubmit}
    >
      <BaseInput
        name="nickName"
        type="text"
        placeholder="닉네임"
        value={form.nickName}
        onChange={handleFormChange}
      />
      <BaseButton bgColor="bg-lime-green-900" textColor="text-off-white-500" disabled={isLoading}>
        {isLoading ? <Spinner /> : '가입하기'}
      </BaseButton>
    </form>
  )
}
