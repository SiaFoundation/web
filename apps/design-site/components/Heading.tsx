import {
  Container,
  NextLink,
  Section,
  SiteHeading,
} from '@siafoundation/design-system'

export function Heading() {
  return (
    <>
      <Section width="flush" py="4" gap="13">
        <Container>
          <SiteHeading
            size="64"
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
      </Section>
    </>
  )
}
