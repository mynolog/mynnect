import Background from '@/components/layout/Background/Background'
import Logo from '@/components/layout/Logo/Logo'
import AuthButtons from '@/components/layout/AuthButtons/AuthButtons'

export default function AuthPage() {
  return (
    <Background>
      <div>
        <Logo type="full" />
      </div>
      <AuthButtons />
    </Background>
  )
}
