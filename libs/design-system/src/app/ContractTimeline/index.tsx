import { Segment } from './Segment'
import { Point } from './Point'

type Props = {
  currentHeight: number
  contractHeightStart: number
  contractHeightEnd: number
  proofWindowHeightStart: number
  proofWindowHeightEnd: number
  revisionHeight?: number
  resolutionHeight?: number
  payoutHeight?: number
  range: {
    startHeight: number
    endHeight: number
  }
}

export function ContractTimeline({
  currentHeight,
  contractHeightStart,
  contractHeightEnd,
  proofWindowHeightStart,
  proofWindowHeightEnd,
  revisionHeight,
  resolutionHeight,
  payoutHeight,
  range,
}: Props) {
  const unconfirmed = currentHeight - contractHeightStart < 6
  return (
    <div className="group/main relative w-full">
      <div className="relative py-6">
        <div className="relative z-10 h-1.5">
          <div className="absolute h-full w-full bg-gray-300 dark:bg-graydark-400 rounded-lg" />
          <div className="group/segments">
            <Segment
              label="contract duration"
              currentHeight={currentHeight}
              startHeight={contractHeightStart}
              endHeight={contractHeightEnd}
              range={range}
              color="blue"
              align="center"
              rounded="start"
              className={unconfirmed ? 'border-dotted opacity-50' : ''}
              showDates
            />
            <Segment
              label="proof window"
              currentHeight={currentHeight}
              startHeight={proofWindowHeightStart}
              endHeight={proofWindowHeightEnd}
              range={range}
              color="green"
              align="end"
              rounded="end"
              className={unconfirmed ? 'border-dotted opacity-50' : ''}
            />
            <Point
              label="contract formation"
              bottomLabel={unconfirmed ? 'unconfirmed' : ''}
              currentHeight={currentHeight}
              eventHeight={contractHeightStart}
              range={range}
              color={unconfirmed ? 'amber' : 'blue'}
              className="z-20"
            />
            <Point
              label="last revision"
              currentHeight={currentHeight}
              eventHeight={revisionHeight}
              range={range}
              color="green"
              className="z-20"
            />
            <Point
              label="resolution"
              currentHeight={currentHeight}
              eventHeight={resolutionHeight}
              range={range}
              color="green"
              className="z-20"
            />
            <Point
              label="payout"
              currentHeight={currentHeight}
              eventHeight={payoutHeight}
              range={range}
              color="green"
              className="z-20"
            />
            <Point
              label="current block"
              currentHeight={currentHeight}
              eventHeight={currentHeight}
              range={range}
              color="gray"
              className="z-10"
              unconfirmedPing={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
