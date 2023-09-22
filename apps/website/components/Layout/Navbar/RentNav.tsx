import { Text } from '@siafoundation/design-system'
import {
  Application16,
  Cloud16,
  Idea16,
  PlayOutline16,
  Terminal16,
} from '@siafoundation/react-icons'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavItem } from './NavItem'
import { NavbarLink } from './NavbarLink'

export function RentNav() {
  const router = useRouter()

  return (
    <NavItem
      trigger={
        <NavbarLink
          size="16"
          underline={
            router.asPath.startsWith(routes.rent.index) ? 'accent' : 'hover'
          }
          href={routes.rent.index}
          title="Rent"
        />
      }
      title="Rent storage space on the Sia network."
    >
      <Text color="verySubtle">Software</Text>
      <NavbarLink
        href={routes.rent.coreSoftware}
        icon={<Terminal16 />}
        title="Core software"
      />
      <NavbarLink
        href={routes.rent.thirdPartySoftware}
        icon={<Application16 />}
        title="Third-party software"
      />
      <NavbarLink
        href={routes.rent.ideas}
        icon={<Idea16 />}
        title="Renting software ideas"
      />
      <Text color="verySubtle">Guides</Text>
      <NavbarLink
        href={routes.rent.guides}
        icon={<Cloud16 />}
        title="Backups and cloud sync"
      />
      <NavbarLink
        href={routes.rent.guides}
        icon={<PlayOutline16 />}
        title="Media streaming and storage"
      />
    </NavItem>
  )
}
