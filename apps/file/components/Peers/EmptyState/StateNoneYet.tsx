import { Button, Text } from '@siafoundation/design-system'
import { Network_132 } from '@siafoundation/react-icons'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <Network_132 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          There are currently no connected peers.
        </Text>
        <Button onClick={(e) => {}}>Add a peer</Button>
      </div>
    </div>
  )
}
