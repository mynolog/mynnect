import BaseButton from '@/components/common/Button/BaseButton'
import { loginWithEmailAndPassword } from '@/services/authServices'

export default function LoginWithEmail() {
  // TODO: 실제 데이터 연동
  const email = ''
  const password = ''

  // TODO: 로컬 로그인 버튼 클릭 이후 로직 작성 완료
  const handleSubmitSignup = async () => {
    const result = await loginWithEmailAndPassword(email, password)
    console.log('로컬 로그인', result)
  }

  return (
    <div>
      <BaseButton onClick={handleSubmitSignup} bgColor="bg-lime-green-500">
        로그인
      </BaseButton>
    </div>
  )
}
