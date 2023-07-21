import {
  Application16,
  Idea16,
  Link,
  Linux16,
  Terminal16,
  Text,
} from '@siafoundation/design-system'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavbarHoverCard } from './NavbarHoverCard'

export function HostNav() {
  const router = useRouter()

  return (
    <NavbarHoverCard
      trigger={
        <Link
          weight="medium"
          underline={
            router.asPath.startsWith(routes.host.index) ? 'accent' : 'hover'
          }
          href={routes.host.index}
        >
          Host
        </Link>
      }
      title={'Offer your storage space on the Sia network.'}
    >
      <Text color="verySubtle">Software</Text>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.host.coreSoftware}
        className="flex gap-2 items-center"
      >
        <Terminal16 />
        Core software
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.host.thirdPartySoftware}
        className="flex gap-2 items-center"
      >
        <Application16 />
        Third-party software
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.host.ideas}
        className="flex gap-2 items-center"
      >
        <Idea16 />
        Hosting software ideas
      </Link>
      <Text color="verySubtle">Guides</Text>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.host.guides}
        className="flex gap-2 items-center"
      >
        <Linux16 />
        Hosting on different operating systems
      </Link>
    </NavbarHoverCard>
  )
}
