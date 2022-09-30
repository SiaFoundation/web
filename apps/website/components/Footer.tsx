import {
  Container,
  Flex,
  Section,
  SiteMap,
  WavesBackdrop,
} from '@siafoundation/design-system'
import { menuSections } from '../config/siteMap'
import { Statsbar } from './Statsbar'

export function Footer() {
  return (
    <Flex direction="column">
      <Section
        py="1"
        width="flush"
        css={{
          position: 'relative',
          borderTop: '$sizes$frame solid $slate3',
          borderBottom: '$sizes$frame solid $slate3',
        }}
      >
        <WavesBackdrop />
        <Container>
          <Flex
            direction="column"
            align="start"
            gap={{
              '@initial': '6',
              '@bp2': '15',
            }}
            css={{ mt: '$5', mb: '$9' }}
          >
            <SiteMap menuSections={menuSections} />
          </Flex>
        </Container>
      </Section>
      <Section
        py="3"
        width="flush"
        css={{
          position: 'relative',
          backgroundColor: '$waves',
        }}
      >
        <Container>
          <Statsbar />
        </Container>
      </Section>
    </Flex>
  )
}
