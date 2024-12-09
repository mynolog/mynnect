import type { BaseImageProps } from './BaseImage'
import BaseImage from './BaseImage'

type AvatarImageProps = {
  borderRadius: string
} & BaseImageProps

export default function AvatarImage({ width, height, alt, src, borderRadius }: AvatarImageProps) {
  return <BaseImage src={src} alt={alt} width={width} height={height} className={borderRadius} />
}
