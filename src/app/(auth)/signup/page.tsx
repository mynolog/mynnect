'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signupWithEmailAndPassword } from '@/services/authServices'
import { useForm } from '@/hooks/useForm'
import BaseButton from '@/components/common/Button/BaseButton'
import BaseInput from '@/components/common/Input/BaseInput'
import Spinner from '@/components/common/Spinner/Spinner'
import { SignupUserCredential } from '@/types/userTypes'

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const { form, handleFormChange } = useForm({
    email: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
  })

  const { email, password, passwordConfirm, displayName, nickName } = form
  const router = useRouter()

  // TODO: 회원가입 버튼 클릭 이후 로직 작성 완료하기
  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: 공백 입력 시 에러 핸들링 UI 구현
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      passwordConfirm.trim() === '' ||
      nickName.trim() === '' ||
      displayName.trim() === ''
    ) {
      return
    }
    //TODO: 비밀번호 불일치 에러 핸들링 UI 구현
    if (password !== passwordConfirm) {
      return
    }
    setIsLoading(true)
    const signupUserCredential: SignupUserCredential = {
      email,
      password,
      displayName,
      nickName,
    }
    try {
      const result = await signupWithEmailAndPassword(signupUserCredential)
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
        name="nickName"
        type="text"
        placeholder="닉네임"
        value={nickName}
        onChange={handleFormChange}
      />
      <BaseInput
        name="displayName"
        type="text"
        placeholder="이름"
        value={displayName}
        onChange={handleFormChange}
      />

      <BaseButton bgColor="bg-lime-green-900" textColor="text-off-white-500" disabled={isLoading}>
        {isLoading ? <Spinner /> : '가입하기'}
      </BaseButton>
    </form>
  )
}
