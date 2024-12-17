import { type BaseButtonProps } from './BaseButton'
import { providersMap } from '@/config/providersMap'
import BaseButton from './BaseButton'

type LoginButtonProps = {
  provider: 'google' | 'github' | 'local'
} & BaseButtonProps

export default function LoginButton({ provider, onClick = () => {}, className }: LoginButtonProps) {
  const { bgColor, textColor, icon, label } = providersMap[provider]

  return (
    <BaseButton
      bgColor={bgColor}
      textColor={textColor}
      onClick={onClick}
      width="w-64"
      height="h-12"
      className={className}
    >
      {icon}
      {label}
    </BaseButton>
  )
}
