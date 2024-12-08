type AuthButtonProps = {
  label: 'login' | 'signup'
  onClick?: () => void
}

export default function AuthButton({ label, onClick }: AuthButtonProps) {
  return (
    <button
      className="w-64 h-12 rounded-xl bg-off-white-500 font-extrabold text-lime-green-900"
      onClick={onClick}
      data-testid="auth-button"
    >
      {label === 'login' ? '로그인' : '회원가입'}
    </button>
  )
}
