import Image from 'next/image'
import DefaultAvatarImage from './DefaultAvatarImage'

export type AvatarImageProps = {
  borderRadius: string
  src: string | null
  alt: string
  width: number
  height: number
  className?: string
  fontSize?: string
}

export default function AvatarImage({
  width,
  height,
  alt,
  src,
  borderRadius,
  fontSize = 'text-5xl',
}: AvatarImageProps) {
  if (!src) {
    return <DefaultAvatarImage width={width} height={height} fontSize={fontSize} />
  }
  return <Image src={src} alt={alt} width={width} height={height} className={borderRadius} />
}
