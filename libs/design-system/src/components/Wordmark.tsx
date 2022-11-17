import { getImageProps } from '../lib/image'
import wordmark from '../assets/wordmark.svg'

const wordmarkProps = getImageProps(wordmark)

export function Wordmark() {
  return (
    <img
      className="h-[39px] w-[65px] dark:brightness-0 dark:invert"
      src={wordmarkProps.src}
      alt="Sia"
    />
  )
}
