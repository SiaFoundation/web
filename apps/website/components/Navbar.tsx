import {
  Flex,
  Heading,
  NextImage,
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
          <NextImage
            {...wordmark}
            css={{
              filter: `invert(${activeTheme === 'dark' ? 1 : 0})`,
            }}
          />
        </Heading>
      </NextLink>
    </Flex>
  )
}
