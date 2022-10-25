import { NextLink, Section, SiteHeading } from '@siafoundation/design-system'

export function Heading() {
  return (
    <Section css={{ py: '$12', backgroundColor: '$loContrast' }}>
      <SiteHeading
        size="64"
        title="The Sia Design System"
        css={{ mb: '$max' }}
        description={
          <>
            The Sia Design System is a component framework used across Sia web
            properties and apps. This site demonstrates each component and its
            main variants. The site features three sections{' '}
            <NextLink href="/">core</NextLink>,{' '}
            <NextLink href="/sites">sites</NextLink>, and{' '}
            <NextLink href="/apps">apps</NextLink>.
          </>
        }
      />
    </Section>
  )
}
