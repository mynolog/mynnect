'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signupWithEmailAndPassword } from '@/services/authServices'
import { useForm } from '@/hooks/useForm'
import BaseButton from '@/components/common/Button/BaseButton'
import BaseInput from '@/components/common/Input/BaseInput'
import Spinner from '@/components/common/Spinner/Spinner'

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const { form, handleFormChange } = useForm({
    email: '',
    password: '',
    passwordConfirm: '',
    userName: '',
  })

  const { email, password, passwordConfirm, userName } = form
  const router = useRouter()

  // TODO: 회원가입 버튼 클릭 이후 로직 작성 완료하기
  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: 공백 입력 시 에러 핸들링 UI 구현
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      passwordConfirm.trim() === '' ||
      userName.trim() === ''
    ) {
      return
    }
    //TODO: 비밀번호 불일치 에러 핸들링 UI 구현
    if (password !== passwordConfirm) {
      return
    }
    setIsLoading(true)
    try {
      const result = await signupWithEmailAndPassword(email, password, userName)
      if (result) {
        router.push('/login')
      }
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="w-1/2 flex flex-col justify-center items-center gap-5"
      onSubmit={handleSignupSubmit}
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
      <BaseInput
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={handleFormChange}
      />
      <BaseInput
        name="userName"
        type="text"
        placeholder="이름"
        value={userName}
        onChange={handleFormChange}
      />

      <BaseButton bgColor="bg-lime-green-900" textColor="text-off-white-500" disabled={isLoading}>
        {isLoading ? <Spinner /> : '가입하기'}
      </BaseButton>
    </form>
  )
}
