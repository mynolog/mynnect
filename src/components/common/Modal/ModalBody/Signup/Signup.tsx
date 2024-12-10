'use client'

import { type FormEvent } from 'react'
import { signupWithEmailAndPassword } from '@/services/authServices'
import { useForm } from '@/hooks/useForm'
import BaseButton from '@/components/common/Button/BaseButton'
import BaseInput from '@/components/common/Input/BaseInput'

export default function Signup() {
  const { form, handleFormChange } = useForm({
    email: '',
    password: '',
    passwordConfirm: '',
    userName: '',
  })

  const { email, password, passwordConfirm, userName } = form

  // TODO: 회원가입 버튼 클릭 이후 로직 작성 완료하기
  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //TODO: 비밀번호 불일치 에러 핸들링
    if (password !== passwordConfirm) {
      return
    }

    try {
      const result = await signupWithEmailAndPassword(email, password, userName)
      console.log('회원가입', result)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  return (
    <form
      className="w-1/2 h-full flex flex-col justify-center  items-center gap-5"
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

      <BaseButton bgColor="bg-lime-green-700" textColor="text-off-white-500">
        회원가입
      </BaseButton>
    </form>
  )
}
