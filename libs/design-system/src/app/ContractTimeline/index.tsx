import { cx } from 'class-variance-authority'
import { blockHeightToTime, blocksToMilliseconds } from '../../lib/blockTime'
import { Tooltip } from '../../core/Tooltip'
import { BlockLabel, DateLabel, RelativeLabel } from './Labels'

type Color = 'red' | 'green' | 'amber'

type Props = {
  currentHeight: number
  startHeightContract: number
  endHeightContract: number
  startHeightProofWindow: number
  endHeightProofWindow: number
  heightPayout?: number
  range: {
    startHeight: number
    endHeight: number
  }
  color?: Color
}

export function ContractTimeline({
  currentHeight,
  startHeightContract,
  endHeightContract,
  startHeightProofWindow,
  endHeightProofWindow,
  heightPayout,
  range,
}: Props) {
  const todayTime = new Date().getTime()
  const spanHeight = range.endHeight - range.startHeight
  const spanTime = blocksToMilliseconds(spanHeight)
  const unconfirmed = currentHeight - startHeightContract < 6

  const rangeStartTime = blockHeightToTime(currentHeight, range.startHeight)
  // const rangeEndTime = blockHeightToTime(currentHeight, range.endHeight)

  const startTimeContract = blockHeightToTime(
    currentHeight,
    startHeightContract
  )
  const endTimeContract = blockHeightToTime(currentHeight, endHeightContract)

  const startTimeProofWindow = blockHeightToTime(
    currentHeight,
    startHeightProofWindow
  )
  const endTimeProofWindow = blockHeightToTime(
    currentHeight,
    endHeightProofWindow
  )

  const timePayout = heightPayout
    ? blockHeightToTime(currentHeight, heightPayout)
    : 0

  const todayPos = (todayTime - rangeStartTime) / spanTime

  const startPosContract = (startTimeContract - rangeStartTime) / spanTime
  const endPosContract = (endTimeContract - rangeStartTime) / spanTime

  const startPosProofWindow = (startTimeProofWindow - rangeStartTime) / spanTime
  const endPosProofWindow = (endTimeProofWindow - rangeStartTime) / spanTime

  const posPayout = timePayout ? (timePayout - rangeStartTime) / spanTime : 0

  return (
    <div className="group/main relative w-full">
      <div className="relative py-6">
        <div className="relative z-10 h-1 rounded-lg">
          <div className="absolute h-full w-full bg-gray-300 dark:bg-graydark-300" />
          <div
            className={cx(
              'group/contract flex justify-between gap-2 absolute h-full rounded-l-lg',
              'transition-colors',
              'bg-blue-500/50 dark:bg-blue-300/50',
              'hover:bg-blue-500/70 hover:dark:bg-blue-300/70'
            )}
            style={{
              left: toPercent(startPosContract),
              width: toPercent(endPosContract - startPosContract),
            }}
          >
            <div className="absolute flex w-full justify-between gap-2">
              <DateLabel
                date={startTimeContract}
                align="start"
                variant="primary"
              />
              <DateLabel
                date={startPosContract}
                align="end"
                variant="primary"
              />
            </div>
            <div className="hidden group-hover/contract:flex absolute w-full justify-between gap-2">
              <BlockLabel
                blockHeight={startHeightContract}
                align="start"
                variant="secondary"
              />
              <RelativeLabel variant="secondary">
                contract duration
              </RelativeLabel>
              <BlockLabel
                blockHeight={endHeightContract}
                align="end"
                variant="secondary"
              />
            </div>
          </div>
          <div
            className={cx(
              'group/proof flex justify-between gap-2 absolute h-full rounded-r-lg',
              'transition-colors',
              'bg-green-500/70 dark:bg-green-300/70',
              'hover:bg-green-500 hover:dark:bg-green-300'
            )}
            style={{
              left: toPercent(startPosProofWindow),
              width: toPercent(endPosProofWindow - startPosProofWindow),
            }}
          >
            <div
              className="hidden group-hover/proof:flex absolute justify-between gap-2"
              style={{
                right: toPercent(1 - endPosProofWindow),
              }}
            >
              <BlockLabel
                blockHeight={startHeightProofWindow}
                align="start"
                variant="secondary"
              />
              <RelativeLabel variant="secondary">proof window</RelativeLabel>
              <BlockLabel
                blockHeight={endHeightProofWindow}
                align="end"
                variant="secondary"
              />
            </div>
          </div>
          {!!timePayout && (
            <div
              className="absolute w-1 h-1 shadow shadow-green-500 dark:shadow-green-500 rounded bg-green-500 dark:bg-green-500"
              style={{
                left: toPercent(posPayout),
              }}
            >
              <DateLabel date={timePayout} align="start" variant="primary" />
            </div>
          )}
        </div>
        {/* today dot */}
        <div
          className="hidden group-hover/main:block absolute top-0 w-px h-full bg-gray-400 dark:bg-white/20"
          style={{
            left: `calc(${toPercent(todayPos)} + 1.5px)`,
          }}
        />
        <Tooltip content={unconfirmed ? 'Unconfirmed' : ''}>
          <div
            className={cx(
              'absolute top-1/2 -translate-y-1/2 z-10 w-1 h-1 rounded-full'
            )}
            style={{
              left: toPercent(todayPos),
            }}
          >
            <div className="z-10 absolute w-full h-full rounded-full bg-gray-1000 dark:bg-white" />
            {unconfirmed && (
              <div className="z-0 absolute w-full h-full scale-150 rounded-full bg-amber-400 dark:bg-amber-400 animate-pulse" />
            )}
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

function toPercent(frac: number) {
  return `${frac * 100}%`
}
