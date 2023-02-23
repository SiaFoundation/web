import { Code, HardDriveIcon, Link, Text } from '@siafoundation/design-system'
import { routes } from '../../config/routes'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <HardDriveIcon className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        There are currently no hosts in the database. Make sure{' '}
        <Code>renterd</Code> can access the network and make sure{' '}
        <Link href={routes.node.index}>peers are being discovered</Link> .
      </Text>
    </div>
  )
}
