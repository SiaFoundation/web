import { Text } from '@siafoundation/design-system'
import { ChartArea32 } from '@siafoundation/react-icons'

export function StateNoData() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <ChartArea32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        No data available.
      </Text>
    </div>
  )
}
