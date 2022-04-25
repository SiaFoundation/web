import {
  Box,
  Flex,
  Heading,
  NextLink,
  useTheme,
} from '@siafoundation/design-system'
import wordmark from '../assets/wordmark.svg'

type Props = {
  onClick?: () => void
}

export function Navbar({ onClick }: Props) {
  const { activeTheme } = useTheme()

  if (onClick) {
    return (
      <Flex align="center" justify="between">
        <Heading size="32" onClick={onClick} css={{ cursor: 'pointer' }}>
          <Box
            as="img"
            src={wordmark.src}
            css={{
              filter: `invert(${activeTheme === 'dark' ? 1 : 0})`,
              height: '39px',
              width: '65px',
            }}
            alt="Sia"
          />
        </Heading>
      </Flex>
    )
  }

  return (
    <Flex align="center" justify="between">
      <NextLink href="/">
        <Heading size="32">
          <Box
            as="img"
            src={wordmark.src}
            css={{
              filter: `invert(${activeTheme === 'dark' ? 1 : 0})`,
              height: '39px',
              width: '65px',
            }}
            alt="Sia"
          />
        </Heading>
      </NextLink>
    </Flex>
  )
}
