'use client'

import BaseButton from '@/components/common/Button/BaseButton'
import { auth } from '@/config/firebaseConfig'
import { loginWithEmailAndPassword } from '@/services/authServices'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

export default function LoginWithEmail() {
  // TODO: 실제 데이터 연동
  const email = 'qwer@qwer.com'
  const password = '1234567890'

  const router = useRouter()

  // TODO: 로컬 로그인 버튼 클릭 이후 로직 작성 완료
  const handleSubmitLogin = async () => {
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
      console.log(newUser)
      mutate('user', newUser, false)
      router.push('/home')
    }
  }

  return (
    <div>
      <BaseButton onClick={handleSubmitLogin} bgColor="bg-lime-green-500">
        로그인
      </BaseButton>
    </div>
  )
}
