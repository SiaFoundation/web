import { Text } from '@siafoundation/design-system'
import { Money32 } from '@siafoundation/react-icons'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <Money32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        The wallet has no transactions yet.
      </Text>
    </div>
  )
}
