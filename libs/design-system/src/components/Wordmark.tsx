import { Box } from '../core/Box'
import { useTheme } from '../hooks/useTheme'
import { getImageProps } from '../lib/image'
import wordmark from '../assets/wordmark.svg'

const wordmarkProps = getImageProps(wordmark)

export function Wordmark() {
  const { activeTheme } = useTheme()

  return (
    <Box
      as="img"
      src={wordmarkProps.src}
      css={{
        filter: activeTheme === 'dark' ? 'brightness(0) invert(1)' : 'none',
        height: '39px',
        width: '65px',
      }}
      alt="Sia"
    />
  )
}
