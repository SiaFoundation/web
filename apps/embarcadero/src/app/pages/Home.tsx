import { Flex, Paragraph, RLink } from '@siafoundation/design-system'
import { routes } from '../routes'

export function Home() {
  return (
    <Flex direction="column" gap="4">
      <Paragraph>
        Welcome to Embarcadero, a tool for conducting escrowless SC/SF swaps.
      </Paragraph>
      <Flex direction="column" gap="4" css={{ mb: '$2' }}>
        <RLink to={routes.create}>Create a new swap transaction →</RLink>
        <RLink to={routes.input}>Load an existing swap transaction →</RLink>
      </Flex>
    </Flex>
  )
}
