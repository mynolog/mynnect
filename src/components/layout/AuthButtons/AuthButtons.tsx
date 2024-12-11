'use client'

import { mutate } from 'swr'
import { auth } from '@/config/firebaseConfig'
import { useRouter } from 'next/navigation'
import LoginButton from '@/components/common/Button/LoginButton'
import { loginWithProvider } from '@/services/authServices'
import BaseButton from '@/components/common/Button/BaseButton'
import { providerMap } from '@/config/providerMap'
import { FaUserPlus } from 'react-icons/fa'

export default function AuthButtons() {
  const router = useRouter()

  const handleLoginWithProvider = async (provider: 'google' | 'github') => {
    try {
      const result = await loginWithProvider(provider)
      if (result) {
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
    } catch (e) {
      console.error(e)
    }
  }

  const moveToSignupPage = () => {
    router.push('/signup')
  }

  const moveToLoginWithEmail = () => {
    router.push('/login')
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-3">
        <LoginButton provider="google" onClick={() => handleLoginWithProvider('google')}>
          <span>{providerMap['google'].label}</span>
        </LoginButton>
        <LoginButton provider="github" onClick={() => handleLoginWithProvider('github')}>
          <span>{providerMap['github'].label}</span>
        </LoginButton>
        <LoginButton provider="local" onClick={moveToLoginWithEmail}>
          <span>{providerMap['local'].label}</span>
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
        >
          <FaUserPlus />
          이메일로 가입하기
        </BaseButton>
      </div>
    </div>
  )
}
