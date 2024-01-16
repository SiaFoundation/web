import { Button, Text } from '@siafoundation/design-system'
import { KeyIcon } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'

export function StateNoneYet() {
  const { openDialog } = useDialog()
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <KeyIcon size={64} />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          There are no S3 authentication keypairs yet. Create one to get
          started.
        </Text>
        <Button
          onClick={() => {
            openDialog('keysCreate')
          }}
        >
          Create keypair
        </Button>
      </div>
    </div>
  )
}
