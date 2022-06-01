import { Flex, Heading, NextLink, Wordmark } from '@siafoundation/design-system'

export function Navbar() {
  return (
    <Flex align="center" justify="between">
      <NextLink href="/">
        <Heading size="32">
          <Wordmark />
        </Heading>
      </NextLink>
    </Flex>
  )
}
