import { Text } from '@siafoundation/design-system'
import { MisuseOutline32 } from '@siafoundation/react-icons'

export function StateError() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <MisuseOutline32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        Error fetching contracts.
      </Text>
    </div>
  )
}
