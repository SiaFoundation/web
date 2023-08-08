import { Text } from '../../core/Text'
import { ProgressBar } from '../../core/ProgressBar'

type Props = {
  nodeBlockHeight: number
  networkBlockHeight: number
  moreThan100BlocksToSync: boolean
  percent: number
}

export function SyncStatus({
  nodeBlockHeight,
  networkBlockHeight,
  moreThan100BlocksToSync,
  percent,
}: Props) {
  return (
    <div className="flex flex-col justify-between h-full mb-1">
      <ProgressBar
        variant="accent"
        value={nodeBlockHeight && networkBlockHeight ? nodeBlockHeight : 0}
        max={networkBlockHeight || 1}
        className=""
      />
      <div className="flex justify-between mt-1.5">
        <Text color="subtle" size="10">
          Syncing...
        </Text>
        {nodeBlockHeight && networkBlockHeight ? (
          !moreThan100BlocksToSync ? (
            <Text color="subtle" size="10">
              {`(${percent}%)`}
            </Text>
          ) : (
            <Text color="subtle" size="10">
              {`${nodeBlockHeight.toLocaleString()} / ${networkBlockHeight.toLocaleString()} (${percent}%)`}
            </Text>
          )
        ) : null}
      </div>
    </div>
  )
}
