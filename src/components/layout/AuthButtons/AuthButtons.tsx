import AuthButton from '@/components/common/Button/AuthButton'

export default function AuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      <AuthButton label="signup" />
      <AuthButton label="login" />
    </div>
  )
}
