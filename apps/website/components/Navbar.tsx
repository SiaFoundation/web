import {
  Flex,
  Heading,
  NextImage,
  NextLink,
} from '@siafoundation/design-system'
import wordmark from '../assets/wordmark.svg'

export function Navbar() {
  return (
    <Flex align="center" justify="between">
      <NextLink href="/">
        <Heading size="2">
          <NextImage {...wordmark} />
        </Heading>
      </NextLink>
    </Flex>
  )
}
