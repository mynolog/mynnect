import { type AvatarImageProps } from './AvatarImage'
import { FaUserAlt } from 'react-icons/fa'

type DefaultAvatarImageProps = Pick<AvatarImageProps, 'width' | 'height'> & {
  fontSize?: string
}

export default function DefaultAvatarImage({
  width,
  height,
  fontSize = 'text-5xl',
}: DefaultAvatarImageProps) {
  return (
    <div
      className={`w-[${width}px] h-[${height}px] rounded-full bg-gray-400 flex justify-center items-center overflow-hidden mr-2`}
    >
      <FaUserAlt className={`${fontSize} text-off-white-500`} />
    </div>
  )
}
