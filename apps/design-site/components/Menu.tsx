import {
  Box,
  Flex,
  NextLink,
  SimpleLogoIcon,
  Text,
} from '@siafoundation/design-system'

export function Menu() {
  return (
    <Flex direction="column" gap="5" align="start">
      <Box css={{ marginBottom: '$4' }}>
        <SimpleLogoIcon />
      </Box>
      <Link href="/">Core</Link>
      <Link href="/sites">Sites</Link>
      <Link href="/apps">Apps</Link>
    </Flex>
  )
}

function Link({ href, children }) {
  return (
    <Text size="20">
      <NextLink variant="light" href={href}>
        {children}
      </NextLink>
    </Text>
  )
}
