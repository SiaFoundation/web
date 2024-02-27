import { Text } from '@siafoundation/design-system'
import { Task32 } from '@siafoundation/react-icons'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <Task32 className="scale-[2]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          There are currenty no alerts.
        </Text>
      </div>
    </div>
  )
}
