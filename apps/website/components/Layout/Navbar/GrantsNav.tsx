import {
  Application16,
  Schematics16,
  Stamp16,
  TestToolIcon,
} from '@siafoundation/design-system'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavItem } from './NavItem'
import { NavbarLink } from './NavbarLink'

export function GrantsNav() {
  const router = useRouter()

  return (
    <NavItem
      trigger={
        <NavbarLink
          size="16"
          underline={
            router.asPath.startsWith(routes.grants.index) ? 'accent' : 'hover'
          }
          href={routes.grants.index}
          title="Grants"
        />
      }
      title={'Learn about the Sia Grants program.'}
    >
      <NavbarLink
        href={routes.grants.process}
        icon={<Schematics16 />}
        title="The grant process"
      />
      <NavbarLink
        href={routes.grants.ideas}
        icon={<Application16 />}
        title="Grant ideas"
      />
      <NavbarLink
        href={routes.grants.applicantFaq}
        icon={<TestToolIcon size={16} />}
        title="Grant applicant FAQ"
      />
      <NavbarLink
        href={routes.grants.approvedFaq}
        icon={<Stamp16 />}
        title="Approved grantee FAQ"
      />
    </NavItem>
  )
}
