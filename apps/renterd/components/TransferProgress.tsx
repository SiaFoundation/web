import { ProgressBar, Text } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { upperFirst } from '@technically/lodash'

function getProgress(transfer: { loaded?: number; size?: number }) {
  return transfer.loaded !== undefined ? transfer.loaded / transfer.size : 1
}

type Props = {
  loaded: number
  size: number
  status: string
}

export function TransferProgress({ loaded, size, status }: Props) {
  const progress = useMemo(() => getProgress({ loaded, size }), [loaded, size])
  return (
    <div className="flex flex-col gap-1 w-full">
      <ProgressBar
        variant="accent"
        value={loaded}
        max={size}
        className={progress === 1 ? 'animate-pulse' : ''}
      />
      <div className="flex gap-2 justify-between">
        <Text size="12" color="subtle">
          {upperFirst(status)}
        </Text>
        <Text size="12" color="subtle">
          {(progress * 100).toFixed(0)}%
        </Text>
      </div>
    </div>
  )
}
