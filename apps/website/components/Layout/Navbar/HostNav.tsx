import {
  Application16,
  Idea16,
  Linux16,
  Terminal16,
  Text,
} from '@siafoundation/design-system'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavItem } from './NavItem'
import { NavbarLink } from './NavbarLink'

export function HostNav() {
  const router = useRouter()

  return (
    <NavItem
      trigger={
        <NavbarLink
          size="16"
          underline={
            router.asPath.startsWith(routes.host.index) ? 'accent' : 'hover'
          }
          href={routes.host.index}
          title="Host"
        />
      }
      title={'Offer your storage space on the Sia network.'}
    >
      <Text color="verySubtle">Software</Text>
      <NavbarLink
        href={routes.host.coreSoftware}
        icon={<Terminal16 />}
        title="Core software"
      />
      <NavbarLink
        href={routes.host.thirdPartySoftware}
        icon={<Application16 />}
        title="Third-party software"
      />
      <NavbarLink
        href={routes.host.ideas}
        icon={<Idea16 />}
        title="Hosting software ideas"
      />
      <Text color="verySubtle">Guides</Text>
      <NavbarLink
        href={routes.host.guides}
        icon={<Linux16 />}
        title="Hosting on different operating systems"
      />
    </NavItem>
  )
}
