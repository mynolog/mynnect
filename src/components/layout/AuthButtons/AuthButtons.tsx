'use client'

import { mutate } from 'swr'
import { auth } from '@/config/firebaseConfig'
import { useRouter } from 'next/navigation'
import LoginButton from '@/components/common/Button/LoginButton'
import { loginWithProvider, logout } from '@/services/authServices'
import { providerMap } from '../../../config/ProviderMap'

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
        router.push('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result) {
        mutate('user', null, false)
        router.push('/auth')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* <AuthButton label="signup" /> */}
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
    </div>
  )
}
