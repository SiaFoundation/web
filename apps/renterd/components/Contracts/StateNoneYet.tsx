import { Text } from '@siafoundation/design-system'
import { FileContractIcon } from '@siafoundation/react-icons'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <FileContractIcon className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        There are currently no active contracts. Configure autopilot or manually
        form contracts to get started.
      </Text>
    </div>
  )
}
