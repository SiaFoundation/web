import { Text } from '@siafoundation/design-system'
import { WalletIcon } from '@siafoundation/react-icons'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <WalletIcon className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        The wallet has no addresses. Add some to get started.
      </Text>
    </div>
  )
}
