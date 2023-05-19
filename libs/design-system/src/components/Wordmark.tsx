import wordmark from '../assets/wordmark.svg'
import { Image } from '../core/Image'

export function Wordmark({ size = 20 }) {
  return (
    <Image
      height={size}
      // width={65}
      className="dark:brightness-0 dark:invert !rounded-none"
      src={wordmark}
      alt="Sia"
    />
  )
}
