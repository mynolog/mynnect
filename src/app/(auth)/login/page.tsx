'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { mutate } from 'swr'
import BaseButton from '@/components/common/Button/BaseButton'
import { auth } from '@/config/firebaseConfig'
import { loginWithEmailAndPassword } from '@/services/authServices'
import Spinner from '@/components/common/Spinner/Spinner'
import { useForm } from '@/hooks/useForm'
import BaseInput from '@/components/common/Input/BaseInput'

export default function LoginWithEmail() {
  // TODO: 실제 데이터 연동
  //   const email = 'qwer@qwer.com'
  //   const password = '1234567890'
  const [isLoading, setIsLoading] = useState(false)
  const { form, handleFormChange } = useForm({
    email: '',
    password: '',
  })
  const { email, password } = form
  const router = useRouter()

  // TODO: 로컬 로그인 버튼 클릭 이후 로직 작성 완료
  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: 공백 입력 시 에러 핸들링 UI 구현
    if (email.trim() === '' || password.trim() === '') {
      return
    }
    setIsLoading(true)
    try {
      const result = await loginWithEmailAndPassword(email, password)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="w-1/2 flex flex-col justify-center items-center gap-5"
      onSubmit={handleLoginSubmit}
    >
      <BaseInput
        name="email"
        type="text"
        placeholder="이메일"
        value={email}
        onChange={handleFormChange}
      />
      <BaseInput
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handleFormChange}
      />

      <BaseButton bgColor="bg-lime-green-900" textColor="text-off-white-500" disabled={isLoading}>
        {isLoading ? <Spinner /> : '로그인'}
      </BaseButton>
    </form>
  )
}
