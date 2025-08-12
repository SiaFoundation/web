import { Button, Text } from '@siafoundation/design-system'
import { Warning32 } from '@siafoundation/react-icons'
import { useConfig } from '../../contexts/config'

export function StateConnError() {
  const { revalidateAndResetForm } = useConfig()
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <Warning32 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          Error retrieving settings from daemon. Please check your connection
          and try again.
        </Text>
        <Button onClick={() => revalidateAndResetForm()}>Reload</Button>
      </div>
    </div>
  )
}
