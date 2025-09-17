import {
  Button,
  Heading,
  Panel,
  Skeleton,
  Text,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { DifficultyMetricsChart } from './DifficultyMetricsChart'
import { useCallback, useState } from 'react'
import {
  useConsensusTip,
  useDifficultyMetrics,
} from '@siafoundation/explored-react'
import { exploredApi } from '../../config'
import { ExplorerAccordion } from '../ExplorerAccordion'
import { ExplorerTextarea } from '../ExplorerTextarea'
import { humanDate } from '@siafoundation/units'

export function DifficultyMetrics() {
  const [hasSetInitialTip, setHasSetInitialTip] = useState(false)
  const [proposedStart, setProposedStart] = useState(1)
  const [proposedEnd, setProposedEnd] = useState(100)
  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(100)
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>()

  const {
    data: tipData,
    error: tipError,
    isLoading: isTipLoading,
    isValidating: isTipValidating,
  } = useConsensusTip({
    api: exploredApi,
    config: {
      swr: {
        refreshInterval: 60000,
        onSuccess: ({ height }) => {
          // Set our updated timestamp
          setLastUpdateTime(new Date())
          if (!hasSetInitialTip) {
            setProposedEnd(height)
            setEnd(height)
            setProposedStart(Math.max(1, (height ?? 0) - 10_000 + 1))
            setStart(Math.max(1, (height ?? 0) - 10_000 + 1))

            setHasSetInitialTip(true)
          }
        },
      },
    },
  })

  const { data, error, isLoading } = useDifficultyMetrics({
    api: exploredApi,
    params: {
      start,
      end: end + 1, // This is non-inclusive, but avg user likely expects inclusive here.
    },
    config: { swr: { refreshInterval: 60000 } },
  })

  const handleRangeUpdate = useCallback(() => {
    if (proposedStart < 1 || proposedEnd < 1 || proposedStart >= proposedEnd)
      return triggerErrorToast({
        title: 'Range Error',
        body: 'Start and end must be sequential and greater than 0',
      })

    setStart(proposedStart)
    setEnd(proposedEnd)
  }, [proposedStart, proposedEnd])

  if (error || tipError)
    return (
      <Panel className="flex flex-col gap-4 p-4 items-center justify-center min-h-[475px]">
        <Text color="subtle">
          Difficulty Metrics or Consensus Tip API Error
        </Text>
      </Panel>
    )

  return (
    <>
      <Panel className="flex flex-col gap-8 p-4">
        <div className="flex justify-between items-center">
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Heading size="32">Difficulty Metrics</Heading>
              <Text color="subtle" className="self-end">
                <Text color="subtle">
                  {lastUpdateTime &&
                    humanDate(lastUpdateTime, {
                      dateStyle: 'short',
                      timeStyle: 'long',
                    })}
                </Text>
              </Text>
            </div>
            <div className="flex justify-between items-center">
              {!isTipLoading && !isTipValidating ? (
                <Text color="subtle">Current Tip: {tipData?.height}</Text>
              ) : (
                <Skeleton className="h-[24px] w-[200px]" />
              )}
              <div className="flex gap-2 items-center">
                <div className="flex gap-2">
                  <Text>First</Text>
                  <input
                    type="number"
                    className="w-[100px] border border-black"
                    value={proposedStart}
                    onChange={(event) =>
                      setProposedStart(Number(event.currentTarget.value))
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleRangeUpdate()
                      }
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Text>Last</Text>
                  <input
                    type="number"
                    className="w-[100px] border border-black"
                    value={proposedEnd}
                    onChange={(event) => {
                      setProposedEnd(Number(event.currentTarget.value))
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleRangeUpdate()
                      }
                    }}
                  />
                </div>
                <Button
                  variant="accent"
                  className="h-[26px]"
                  onClick={handleRangeUpdate}
                >
                  Update
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Text color="subtle">
                {(end - start + 1).toLocaleString()} blocks across{' '}
                {data?.blockTimes.length} data points
              </Text>
            </div>
          </div>
        </div>
        {!isLoading && data ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Heading size="24">Block Times</Heading>
            </div>
            <DifficultyMetricsChart
              yType="time"
              timeUnit="m"
              values={data.blockTimes}
              blocksPerStep={data.blocksPerStep}
              xFirstBlock={start}
            />
          </div>
        ) : (
          <Skeleton className="h-[515px]" />
        )}
        {!isLoading && data ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Heading size="24">Difficulties</Heading>
            </div>
            <DifficultyMetricsChart
              yType="hash"
              values={data?.difficulties?.map(Number) ?? []}
              blocksPerStep={data?.blocksPerStep}
              xFirstBlock={start}
            />
          </div>
        ) : (
          <Skeleton className="h-[515px]" />
        )}
        {!isLoading && data ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Heading size="24">Drifts</Heading>
            </div>
            <DifficultyMetricsChart
              yType="time"
              timeUnit="h"
              values={data.drifts}
              blocksPerStep={data.blocksPerStep}
              xFirstBlock={start}
              includeZero="always"
            />
          </div>
        ) : (
          <Skeleton className="h-[515px]" />
        )}
      </Panel>
      <ExplorerAccordion title="Difficulty Metrics JSON">
        <div className="p-2">
          <ExplorerTextarea value={JSON.stringify(data, null, 2)} />
        </div>
      </ExplorerAccordion>
    </>
  )
}
