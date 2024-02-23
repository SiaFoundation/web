import { Button, Text } from '@siafoundation/design-system'
import { Close16 } from '@siafoundation/react-icons'
import { TransferProgress } from './TransferProgress'

type Props = {
  loaded: number
  size: number
  path: string
  abortTip: string
  abort?: () => void
  status: string
}

export function TransfersBarItem({
  loaded,
  size,
  path,
  abortTip,
  abort,
  status,
}: Props) {
  return (
    <div className="flex flex-col gap-1 border-t first:border-t-0 border-gray-200 dark:border-graydark-300 px-3 py-2">
      <div className="flex gap-1">
        <Text ellipsis size="14" className="flex-1">
          {path}
        </Text>
        <Button
          tip={abortTip}
          variant="ghost"
          size="none"
          onClick={() => abort?.()}
        >
          <Close16 />
        </Button>
      </div>
      <TransferProgress loaded={loaded} size={size} status={status} />
    </div>
  )
}
