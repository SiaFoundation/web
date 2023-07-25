import {
  Application16,
  Cloud16,
  Idea16,
  Link,
  PlayOutline16,
  Terminal16,
  Text,
} from '@siafoundation/design-system'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavbarHoverCard } from './NavbarHoverCard'

export function RentNav() {
  const router = useRouter()

  return (
    <NavbarHoverCard
      trigger={
        <Link
          weight="medium"
          underline={
            router.asPath.startsWith(routes.rent.index) ? 'accent' : 'hover'
          }
          href={routes.rent.index}
        >
          Rent
        </Link>
      }
      title="Rent storage space on the Sia network."
    >
      <Text color="verySubtle">Software</Text>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.rent.coreSoftware}
        className="flex gap-2 items-center"
      >
        <Terminal16 />
        Core software
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.rent.thirdPartySoftware}
        className="flex gap-2 items-center"
      >
        <Application16 />
        Third-party software
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.rent.ideas}
        className="flex gap-2 items-center"
      >
        <Idea16 />
        Renting software ideas
      </Link>
      <Text color="verySubtle">Guides</Text>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.rent.guides}
        className="flex gap-2 items-center"
      >
        <Cloud16 />
        Backups and cloud sync
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.rent.guides}
        className="flex gap-2 items-center"
      >
        <PlayOutline16 />
        Media streaming and storage
      </Link>
      {/* <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.rent.mediaStorage}
                className="flex gap-2 items-center"
              >
                <Network_116 />
                Enterprise object-storage
              </Link> */}
    </NavbarHoverCard>
  )
}
