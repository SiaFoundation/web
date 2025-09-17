import {
  Button,
  Heading,
  Panel,
  Skeleton,
  Text,
  TextField,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { DifficultyMetricsChart } from './DifficultyMetricsChart'
import { useCallback, useRef, useState, useEffect } from 'react'
import {
  useConsensusTip,
  useDifficultyMetrics,
} from '@siafoundation/explored-react'
import { exploredApi } from '../../config'
import { ExplorerAccordion } from '../ExplorerAccordion'
import { ExplorerTextarea } from '../ExplorerTextarea'
import { humanDate } from '@siafoundation/units'

const ValidationIndicator = () => {
  return (
    <div className="absolute top-10 right-2 rounded px-2 py-0.5 text-xs bg-black/40 text-white">
      updating…
    </div>
  )
}

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
        keepPreviousData: true,
        onSuccess: ({ height }) => {
          setLastUpdateTime(new Date())
          if (!hasSetInitialTip) {
            setProposedEnd(height)
            setEnd(height)
            setProposedStart(1)
            setStart(1)
            setHasSetInitialTip(true)
          }
        },
      },
    },
  })

  const { data, error, isValidating } = useDifficultyMetrics({
    api: exploredApi,
    params: { start, end: end + 1 },
    config: { swr: { refreshInterval: 60000, keepPreviousData: true } },
  })

  const prevDataRef = useRef<typeof data>(null)
  useEffect(() => {
    if (data) prevDataRef.current = data
  }, [data])
  const stableData = data ?? prevDataRef.current

  const handleManualRangeUpdate = useCallback(() => {
    if (proposedStart < 1 || proposedEnd < 1 || proposedStart >= proposedEnd) {
      return triggerErrorToast({
        title: 'Range Error',
        body: 'Start and end must be sequential and greater than 0',
      })
    }
    setStart(proposedStart)
    setEnd(proposedEnd)
  }, [proposedStart, proposedEnd])

  const handleSelectedRangeUpdate = (startN: number, endN: number) => {
    setProposedStart(startN)
    setProposedEnd(endN)
    setStart(startN)
    setEnd(endN)
  }

  const handlePanRangeUpdate = (dir: 'earlier' | 'later') => {
    if (!tipData) return
    const tip = tipData.height
    const count = Math.max(1, end - start + 1)

    if (dir === 'earlier') {
      const nextStart = Math.max(1, start - count)
      const nextEnd = Math.min(tip, nextStart + count - 1)
      if (nextStart === start && nextEnd === end) return
      setProposedStart(nextStart)
      setStart(nextStart)
      setProposedEnd(nextEnd)
      setEnd(nextEnd)
      return
    }

    const nextEnd = Math.min(tip, end + count)
    const nextStart = Math.max(1, nextEnd - count + 1)
    if (nextStart === start && nextEnd === end) return
    setProposedStart(nextStart)
    setStart(nextStart)
    setProposedEnd(nextEnd)
    setEnd(nextEnd)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      handlePanRangeUpdate('earlier')
      e.preventDefault()
    } else if (e.key === 'ArrowRight') {
      handlePanRangeUpdate('later')
      e.preventDefault()
    }
  }

  const handleReset = () => {
    if (tipData) {
      setProposedStart(1)
      setStart(1)
      setProposedEnd(tipData.height)
      setEnd(tipData.height)
    }
  }

  if (error || tipError) {
    return (
      <Panel className="flex flex-col gap-4 p-4 items-center justify-center min-h-[475px]">
        <Text color="subtle">
          Difficulty Metrics or Consensus Tip API Error
        </Text>
      </Panel>
    )
  }

  return (
    <>
      <Panel
        className="flex flex-col gap-8 p-4 focus:outline-none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
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
                <Text color="subtle">
                  Current Tip: {tipData?.height.toLocaleString()}
                </Text>
              ) : (
                <Skeleton className="h-[24px] w-[200px]" />
              )}
              <div className="flex gap-2 items-center">
                <div className="flex gap-2">
                  <Text>First</Text>
                  <TextField
                    type="number"
                    className="w-[100px]"
                    value={proposedStart}
                    onChange={(event) =>
                      setProposedStart(Number(event.currentTarget.value))
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') handleManualRangeUpdate()
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Text>Last</Text>
                  <TextField
                    type="number"
                    className="w-[100px]"
                    value={proposedEnd}
                    onChange={(event) =>
                      setProposedEnd(Number(event.currentTarget.value))
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') handleManualRangeUpdate()
                    }}
                  />
                </div>
                <Button
                  variant="accent"
                  className="h-[26px]"
                  onClick={handleManualRangeUpdate}
                >
                  Update
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Text color="subtle">
                {(end - start + 1).toLocaleString()} blocks across{' '}
                {stableData?.blockTimes.length ?? 0} data points
              </Text>
            </div>
          </div>
        </div>

        {/* First-load skeleton; after that, always render charts (using stableData) */}
        {!stableData ? (
          <Skeleton className="h-[515px]" />
        ) : (
          <>
            {/* Block Times */}
            <div className="flex flex-col gap-4 relative">
              <div className="flex justify-between">
                <Heading size="24">Block Times</Heading>
              </div>
              <div className="relative">
                <DifficultyMetricsChart
                  yType="time"
                  timeUnit="m"
                  values={stableData.blockTimes}
                  blocksPerStep={stableData.blocksPerStep}
                  xFirstBlock={start}
                  onSelectRange={handleSelectedRangeUpdate}
                  onReset={handleReset}
                  onPanBlocks={handlePanRangeUpdate}
                />
                {isValidating && <ValidationIndicator />}
              </div>
            </div>

            {/* Difficulty */}
            <div className="flex flex-col gap-4 relative">
              <div className="flex justify-between">
                <Heading size="24">Difficulty</Heading>
              </div>
              <div className="relative">
                <DifficultyMetricsChart
                  yType="hash"
                  values={stableData.difficulties.map(Number)}
                  blocksPerStep={stableData.blocksPerStep}
                  xFirstBlock={start}
                  onSelectRange={handleSelectedRangeUpdate}
                  onReset={handleReset}
                  onPanBlocks={handlePanRangeUpdate}
                />
                {isValidating && <ValidationIndicator />}
              </div>
            </div>

            {/* Drifts */}
            <div className="flex flex-col gap-4 relative">
              <div className="flex justify-between">
                <Heading size="24">Drifts</Heading>
              </div>
              <div className="relative">
                <DifficultyMetricsChart
                  yType="time"
                  timeUnit="h"
                  includeZero="always"
                  values={stableData.drifts}
                  blocksPerStep={stableData.blocksPerStep}
                  xFirstBlock={start}
                  onSelectRange={handleSelectedRangeUpdate}
                  onReset={handleReset}
                  onPanBlocks={handlePanRangeUpdate}
                />
                {isValidating && <ValidationIndicator />}
              </div>
            </div>
          </>
        )}
      </Panel>

      <ExplorerAccordion title="Difficulty Metrics JSON">
        <div className="p-2">
          <ExplorerTextarea
            value={JSON.stringify(stableData ?? null, null, 2)}
          />
        </div>
      </ExplorerAccordion>
    </>
  )
}
