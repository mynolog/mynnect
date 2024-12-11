import { type BaseButtonProps } from './BaseButton'
import { providerMap } from '@/config/providerMap'
import BaseButton from './BaseButton'

type LoginButtonProps = {
  provider: 'google' | 'github' | 'local'
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
    </BaseButton>
  )
}
