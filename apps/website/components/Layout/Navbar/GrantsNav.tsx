import {
  Application16,
  Link,
  Schematics16,
  Stamp16,
  TestToolIcon,
} from '@siafoundation/design-system'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavbarHoverCard } from './NavbarHoverCard'

export function GrantsNav() {
  const router = useRouter()

  return (
    <NavbarHoverCard
      trigger={
        <Link
          weight="medium"
          underline={
            router.asPath.startsWith(routes.grants.index) ? 'accent' : 'hover'
          }
          href={routes.grants.index}
        >
          Grants
        </Link>
      }
      title={'Learn about the Sia Grants program.'}
    >
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.grants.process}
        className="flex gap-2 items-center"
      >
        <Schematics16 />
        The grant process
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.grants.ideas}
        className="flex gap-2 items-center"
      >
        <Application16 />
        Grant ideas
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.grants.applicantFaq}
        className="flex gap-2 items-center"
      >
        <TestToolIcon size={16} />
        Grant applicant FAQ
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.grants.approvedFaq}
        className="flex gap-2 items-center"
      >
        <Stamp16 />
        Approved grantee FAQ
      </Link>
    </NavbarHoverCard>
  )
}
