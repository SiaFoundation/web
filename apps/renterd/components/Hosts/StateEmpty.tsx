import {
  Code,
  Filter32,
  HardDriveIcon,
  LinkButton,
  MisuseOutline32,
  PlaneIcon,
  Text,
} from '@siafoundation/design-system'
import { useApp } from '../../contexts/app'
import { routes } from '../../config/routes'
import { useHosts } from '../../contexts/hosts'

export function StateEmpty() {
  const { autopilot } = useApp()
  const { dataState } = useHosts()

  if (autopilot.state === 'on' && !autopilot.status.data?.configured) {
    return (
      <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
        <Text>
          <PlaneIcon className="scale-[200%]" />
        </Text>
        <div className="flex flex-col gap-3 items-center">
          <Text color="subtle" className="text-center max-w-[500px]">
            Autopilot must be configured before using the hosts explorer.
          </Text>
          <LinkButton href={routes.autopilot.index}>
            Configure autopilot
          </LinkButton>
        </div>
      </div>
    )
  }

  if (dataState === 'error') {
    return (
      <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
        <Text>
          <MisuseOutline32 className="scale-[200%]" />
        </Text>
        <Text color="subtle" className="text-center max-w-[500px]">
          Error fetching hosts.
        </Text>
      </div>
    )
  }

  if (dataState === 'noneMatchingFilters') {
    return (
      <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
        <Text>
          <Filter32 className="scale-[200%]" />
        </Text>
        <Text color="subtle" className="text-center max-w-[500px]">
          No hosts matching filters.
        </Text>
      </div>
    )
  }
  if (dataState === 'noneYet') {
    return (
      <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
        <Text>
          <HardDriveIcon className="scale-[200%]" />
        </Text>
        <div className="flex flex-col gap-3 items-center">
          <Text color="subtle" className="text-center max-w-[500px]">
            There are currently no hosts in the database. Make sure{' '}
            <Code>renterd</Code> can access the network and make sure peers are
            being discovered.
          </Text>
          <LinkButton href={routes.node.index}>View peers</LinkButton>
        </div>
      </div>
    )
  }

  return null
}
