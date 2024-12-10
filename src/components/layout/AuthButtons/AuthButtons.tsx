'use client'

import { mutate } from 'swr'
import { auth } from '@/config/firebaseConfig'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import LoginButton from '@/components/common/Button/LoginButton'
import { loginWithProvider } from '@/services/authServices'
import { providerMap } from '../../../config/ProviderMap'
import BaseButton from '@/components/common/Button/BaseButton'
import { openModal } from '@/store/modal/modalSlice'
import { FaUserPlus } from 'react-icons/fa'

export default function AuthButtons() {
  const router = useRouter()
  const dispatch = useDispatch()

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

  const handleSignupClick = () => {
    dispatch(openModal('signup'))
  }

  const handleLoginWithEmailClick = () => {
    dispatch(openModal('loginWithEmail'))
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-3">
        <LoginButton provider="google" onClick={() => handleLoginWithProvider('google')}>
          <span>{providerMap['google'].label}</span>
        </LoginButton>
        <LoginButton
          provider="github"
          onClick={() => handleLoginWithProvider('github')}
          bgColor="bg-github-gray"
          textColor="text-off-white-500"
        >
          <span>{providerMap['github'].label}</span>
        </LoginButton>
        <LoginButton provider="local" onClick={handleLoginWithEmailClick}>
          <span>{providerMap['local'].label}</span>
        </LoginButton>
      </div>
      <span className="text-off-white-500 font-extrabold">OR</span>
      <div>
        <BaseButton onClick={handleSignupClick} width="w-64" height="h-12">
          <FaUserPlus />
          이메일로 가입하기
        </BaseButton>
      </div>
    </div>
  )
}
