import {
  Box,
  Flex,
  Heading,
  NextLink,
  useTheme,
} from '@siafoundation/design-system'
import wordmark from '../assets/wordmark.svg'

export function Navbar() {
  const { activeTheme } = useTheme()

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
