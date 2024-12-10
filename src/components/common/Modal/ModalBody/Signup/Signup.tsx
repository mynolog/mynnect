import BaseButton from '@/components/common/Button/BaseButton'
import { signupWithEmailAndPassword } from '@/services/authServices'

type SignupProps = {}

export default function Signup() {
  // TODO: 실제 데이터 연동하기
  const email = ''
  const password = ''
  const name = ''

  // TODO: 회원가입 버튼 클릭 이후 로직 작성 완료하기
  const handleSubmitSignup = async () => {
    const result = await signupWithEmailAndPassword(email, password, name)
    console.log('회원가입', result)
  }

  return (
    <div>
      <BaseButton onClick={handleSubmitSignup} bgColor="bg-lime-green-500">
        회원가입
      </BaseButton>
    </div>
  )
}
