'use client'

import { useState } from 'react'
import { mutate } from 'swr'
import { auth } from '@/config/firebaseConfig'
import { useRouter } from 'next/navigation'
import LoginButton from '@/components/common/Button/LoginButton'
import { loginWithProvider } from '@/services/authServices'
import BaseButton from '@/components/common/Button/BaseButton'
import { providersMap } from '@/config/providersMap'
import { FaUserPlus } from 'react-icons/fa'
import Spinner from '@/components/common/Spinner/Spinner'

export default function AuthButtons() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginWithProvider = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    try {
      const result = await loginWithProvider(provider)
      if (result) {
        if (result.redirectToSignupComplete) {
          router.push('/signup/social')
        } else {
          const { currentUser } = auth
          const newUser = currentUser
            ? {
                name: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                uid: currentUser.uid,
              }
            : null
          mutate('user', newUser, false)
          router.push('/home')
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const moveToSignupPage = () => {
    router.push('/signup')
  }

  const moveToLoginWithEmail = () => {
    router.push('/login')
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col gap-3">
            <LoginButton provider="google" onClick={() => handleLoginWithProvider('google')}>
              <span>{providersMap['google'].label}</span>
            </LoginButton>
            <LoginButton provider="github" onClick={() => handleLoginWithProvider('github')}>
              <span>{providersMap['github'].label}</span>
            </LoginButton>
            <LoginButton
              disabled={true}
              className="cursor-not-allowed"
              provider="local"
              onClick={moveToLoginWithEmail}
            >
              <span>{providersMap['local'].label}</span>
            </LoginButton>
          </div>
          <span className="text-lime-green-900 font-extrabold">OR</span>
          <div>
            <BaseButton
              onClick={moveToSignupPage}
              width="w-64"
              height="h-12"
              bgColor="bg-lime-green-900"
              textColor="text-off-white-500"
              className="cursor-not-allowed"
              disabled={true}
            >
              <FaUserPlus />
              이메일로 가입하기
            </BaseButton>
          </div>
        </div>
      )}
    </>
  )
}
