import { type BaseButtonProps } from './BaseButton'
import BaseButton from './BaseButton'
import { providerMap } from '@/config/ProviderMap'

type LoginButtonProps = {
  provider: 'google' | 'github'
} & BaseButtonProps

export default function LoginButton({ provider, onClick = () => {} }: LoginButtonProps) {
  const { bgColor, textColor, icon, label } = providerMap[provider]

  return (
    <BaseButton
      bgColor={bgColor}
      textColor={textColor}
      onClick={onClick}
      width="w-64"
      height="h-12"
    >
      {icon}
      {label}
      로그인
    </BaseButton>
  )
}
