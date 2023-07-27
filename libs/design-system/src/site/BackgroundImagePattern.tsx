import { cx } from 'class-variance-authority'
import { Image } from '../core/Image'

type Props = {
  background: string
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
        quality={1}
        width={256 * 3}
        height={160 * 3}
        alt="bg"
        src={background}
      />
    </div>
  )
}
