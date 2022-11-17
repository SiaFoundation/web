import { Link, Section, SiteHeading } from '@siafoundation/design-system'

export function Heading() {
  return (
    <Section className="py-24 bg-white dark:bg-graydark-50">
      <SiteHeading
        size="64"
        title="The Sia Design System"
        className="mb-40"
        description={
          <>
            The Sia Design System is a component framework used across Sia web
            properties and apps. This site demonstrates each component and its
            main variants. The site features three sections{' '}
            <Link href="/">core</Link>, <Link href="/sites">sites</Link>, and{' '}
            <Link href="/apps">apps</Link>.
          </>
        }
      />
    </Section>
  )
}
