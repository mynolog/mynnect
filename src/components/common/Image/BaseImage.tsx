import Image from 'next/image'

export type BaseImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function BaseImage({ src, alt, width, height, className }: BaseImageProps) {
  return <Image src={src} alt={alt} width={width} height={height} className={className} />
}
