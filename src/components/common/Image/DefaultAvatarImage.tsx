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
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`rounded-full bg-native-gray-600 flex justify-center items-center overflow-hidden mr-2`}
    >
      <FaUserAlt className={`${fontSize} text-off-white-500`} />
    </div>
  )
}
