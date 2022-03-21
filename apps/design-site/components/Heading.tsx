import {
  Code,
  Container,
  NextLink,
  Section,
  SiteHeading,
  Text,
  WavesBackdrop,
} from '@siafoundation/design-system'

export function Heading() {
  return (
    <>
      <Section width="flush" size="4" gap="13">
        <Container>
          <SiteHeading
            size="3"
            title="The Sia Design System"
            description={
              <>
                The Sia Design System is a component framework used across Sia
                web properties and apps. This site demonstrates each component
                and its main variants. The site features three sections{' '}
                <NextLink href="/">core</NextLink>,{' '}
                <NextLink href="/sites">sites</NextLink>, and{' '}
                <NextLink href="/apps">apps</NextLink>.
              </>
            }
          />
        </Container>
        {/* <Section width="flush" size="2" css={{ position: 'relative' }}>
          <WavesBackdrop />
          <Container>
            <Section size="0" width="flush" gap="6">
              <Text size="16" weight="bold">
                Installation
              </Text>
              <Text size="16">
                <Code>npm install @siafoundation/design-system</Code>
              </Text>
            </Section>
          </Container>
        </Section> */}
      </Section>
    </>
  )
}
