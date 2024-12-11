export type BaseButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  bgColor?:
    | 'bg-github-gray'
    | 'bg-off-white-500'
    | 'bg-lime-green-500'
    | 'bg-lime-green-700'
    | 'bg-lime-green-900'
    | 'bg-native-gray-600'
  textColor?: 'text-dim-gray-600' | 'text-off-white-500'
  width?: 'w-10' | 'w-28' | 'w-44' | 'w-64'
  height?: 'h-8' | 'h-10' | 'h-12'
  disabled?: boolean
}

export default function BaseButton({
  children,
  onClick = () => {},
  bgColor = 'bg-off-white-500',
  textColor = 'text-dim-gray-600',
  width = 'w-28',
  height = 'h-10',
  disabled = false,
}: BaseButtonProps) {
  return (
    <button
      className={`${disabled ? 'bg-gray-400' : bgColor} ${textColor} ${width} ${height} rounded-xl flex justify-center items-center gap-2 font-bold opacity-85 transition-all ease-in-out duration-300 hover:opacity-100 hover:scale-105`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
