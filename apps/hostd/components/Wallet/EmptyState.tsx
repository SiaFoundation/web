import { Button, Code, Text } from '@siafoundation/design-system'
import { Wallet32 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'

export function EmptyState() {
  const { openDialog } = useDialog()
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <Wallet32 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-6 justify-center items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          Send funds to your <Code>hostd</Code> wallet address to get started.
        </Text>
        <Button variant="accent" onClick={() => openDialog('addressDetails')}>
          View address
        </Button>
      </div>
    </div>
  )
}
