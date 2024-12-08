import Background from '@/components/layout/Background/Background'
import Logo from '@/components/layout/Logo/Logo'
import AuthButton from '@/components/common/Button/AuthButton'

export default function Home() {
  return (
    <Background>
      <div>
        <Logo type="full" />
      </div>
      <div className="flex flex-col gap-3">
        <AuthButton label="signup" />
        <AuthButton label="login" />
      </div>
    </Background>
  )
}
