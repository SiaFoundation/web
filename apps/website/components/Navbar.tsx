import {
  Flex,
  Heading,
  NextImage,
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
          <NextImage
            {...wordmark}
            css={{
              filter: `invert(${activeTheme === 'dark' ? 1 : 0})`,
            }}
          />
        </Heading>
      </Flex>
    )
  }

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
