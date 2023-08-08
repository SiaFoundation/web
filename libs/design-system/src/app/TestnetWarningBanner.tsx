import { Warning16 } from '../icons/carbon'
import { Text } from '../core/Text'

export function TestnetWarningBanner({ testnetName }: { testnetName: string }) {
  return (
    <div className="flex gap-2 items-center justify-center py-2 px-3 bg-amber-600 dark:bg-amber-500">
      <Text color="lo">
        <Warning16 />
      </Text>
      <Text size="14" color="lo">
        Warning, you are on the {testnetName}.
      </Text>
    </div>
  )
}
