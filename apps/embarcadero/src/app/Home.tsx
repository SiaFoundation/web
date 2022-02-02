import { Flex, Paragraph, RLink } from '@siafoundation/design-system'

export function Home() {
  return (
    <Flex direction="column" gap="4">
      <Paragraph>
        Welcome to Embarcadero, a tool for conducting escrowless SC/SF swaps.
      </Paragraph>
      <Flex direction="column" gap="2">
        <RLink to="/create">Create a partial transaction →</RLink>
        <RLink to="/accept">Accept a partia transaction →</RLink>
        <RLink to="/finish">Finish a complete transaction →</RLink>
      </Flex>
    </Flex>
  )
}
