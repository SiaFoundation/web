import {
  Box,
  Flex,
  NextLink,
  SimpleLogoIcon,
  Text,
} from '@siafoundation/design-system'
import { sitemap } from '../config/site'

export function Menu() {
  return (
    <Flex direction="column" gap="5" align="start">
      <Box css={{ marginBottom: '$4' }}>
        <SimpleLogoIcon />
      </Box>
      <Link href={sitemap.home.index}>Home</Link>
      <Link href={sitemap.developers.index}>Developers</Link>
      <Link href={sitemap.learn.index}>Learn</Link>
      <Link href={sitemap.community.index}>Community & Ecosystem</Link>
      <Link href={sitemap.foundation.index}>The Sia Foundation</Link>
    </Flex>
  )
}

function Link({ href, children }) {
  return (
    <Text size="4">
      <NextLink variant="light" href={href}>
        {children}
      </NextLink>
    </Text>
  )
}
