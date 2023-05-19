import { cx } from 'class-variance-authority'
import { StaticImageData } from 'next/image'
import { Image } from '../core/Image'

type Props = {
  background: StaticImageData
  className?: string
}

export function BackgroundImagePattern({ background, className }: Props) {
  return (
    <div className="absolute z-0 w-full h-full top-0 left-0">
      <div className="absolute w-full h-full mix-blend-difference dark:mix-blend-difference z-10 bg-white dark:bg-graydark-50" />
      <Image
        className={cx(
          'absolute z-0 w-full h-full object-cover opacity-[10%] dark:opacity-10',
          className
        )}
        width={200}
        quality={10}
        alt="bg"
        src={background}
      />
    </div>
  )
}
