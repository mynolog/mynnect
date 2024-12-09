export type BaseButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  bgColor?: 'bg-github-gray' | 'bg-off-white-500'
  textColor?: 'text-dim-gray-600' | 'text-off-white-500'
  width?: 'w-28' | 'w-64'
  height?: 'h-10' | 'h-12'
}

export default function BaseButton({
  children,
  onClick = () => {},
  bgColor = 'bg-off-white-500',
  textColor = 'text-dim-gray-600',
  width = 'w-28',
  height = 'h-10',
}: BaseButtonProps) {
  return (
    <button
      className={`${bgColor} ${textColor} ${width} ${height} rounded-xl flex justify-center items-center gap-2`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
