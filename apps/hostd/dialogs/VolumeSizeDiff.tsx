import { GBToBytes, Text } from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { cx } from 'class-variance-authority'

type Props = {
  label?: React.ReactNode
  newSizeGB?: number
  currentSizeGB?: number
  maxSizeGB?: number
}

export function VolumeSizeDiff({
  label,
  newSizeGB = 0,
  currentSizeGB = 0,
  maxSizeGB = 0,
}: Props) {
  const isNewSizeBigger = currentSizeGB < newSizeGB
  const isNewSizeSmaller = currentSizeGB > newSizeGB
  const notEnoughSpace = newSizeGB > maxSizeGB

  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full h-1 rounded-lg bg-gray-300 dark:bg-graydark-300 overflow-hidden">
        <div
          className={cx(
            'absolute h-1 rounded-tl-lg rounded-bl-lg',
            isNewSizeSmaller
              ? 'bg-red-500 dark:bg-red-500'
              : 'bg-gray-700 dark:bg-graydark-800',
            isNewSizeBigger ? 'z-10' : 'z-0'
          )}
          style={{
            width: maxSizeGB ? `${(currentSizeGB / maxSizeGB) * 100}%` : '0%',
          }}
        />
        <div
          className={cx(
            'absolute h-1 rounded-tl-lg rounded-bl-lg',
            notEnoughSpace
              ? 'bg-amber-500 dark:bg-amber-500'
              : isNewSizeBigger
              ? 'bg-green-500 dark:bg-green-500'
              : 'bg-gray-700 dark:bg-graydark-800',
            isNewSizeSmaller ? 'z-10' : 'z-0'
          )}
          style={{
            width: maxSizeGB ? `${(newSizeGB / maxSizeGB) * 100}%` : '0%',
          }}
        />
      </div>
      <div className="h-4 flex justify-between">
        {label || <div />}
        {maxSizeGB ? (
          <Text size="12" color="subtle">{`${(
            (newSizeGB / maxSizeGB) *
            100
          ).toFixed(0)}% of ${humanBytes(
            GBToBytes(maxSizeGB)
          )} available`}</Text>
        ) : null}
      </div>
    </div>
  )
}
