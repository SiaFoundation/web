import { ClientSideOnly, Skeleton, Text } from '@siafoundation/design-system'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  title: 'Require' | 'Allow'
  blockHeight: string
  date: string
}

const padToTwoDigits = (num: number) => num.toString().padStart(2, '0')

const timeUnits = [
  { unit: 1000 * 60 * 60 * 24 }, // Days
  { unit: 1000 * 60 * 60 }, // Hours
  { unit: 1000 * 60 }, // Minutes
  { unit: 1000 }, // Seconds
]

export function HardforkCountdownItem({ title, blockHeight, date }: Props) {
  const targetDate = new Date(date).getTime()

  const calculateTimeLeft = useCallback(() => {
    return Math.max(targetDate - new Date().getTime(), 0)
  }, [targetDate])

  const [countdownMS, setCountdownMS] = useState(calculateTimeLeft())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (countdownMS === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCountdownMS(calculateTimeLeft())
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [countdownMS, calculateTimeLeft])

  const [days, hours, minutes, seconds] = timeUnits.reduce(
    ({ remaining, values }, { unit }) => {
      const value = Math.floor(remaining / unit)
      return {
        remaining: remaining % unit,
        values: [...values, padToTwoDigits(value)],
      }
    },
    { remaining: countdownMS, values: [] as string[] }
  ).values

  return (
    <>
      <div className="flex flex-col gap-6">
        <Text color="subtle" scaleSize="14" className="w-full" ellipsis>
          {title} Height
        </Text>
        <Text
          className="text-xl md:text-3xl"
          weight="semibold"
          color="contrast"
        >
          {blockHeight}
        </Text>
      </div>
      <div className="flex flex-col gap-6">
        <Text color="subtle" scaleSize="14" className="w-full" ellipsis>
          {title} Time (approx.)
        </Text>
        <ClientSideOnly
          fallback={
            <div className="flex flex-col gap-6">
              <Skeleton className="w-[140px] h-[28px] md:w-[250px] md:h-[36px]" />
            </div>
          }
        >
          <Text
            className="text-xl md:text-3xl"
            weight="semibold"
            color="contrast"
            ellipsis
          >
            {new Date(date).toLocaleString(undefined, {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </Text>
        </ClientSideOnly>
      </div>
      <div className="flex flex-col gap-6">
        <Text color="subtle" scaleSize="14" className="w-full" ellipsis>
          {title} Countdown (approx.)
        </Text>
        <ClientSideOnly
          fallback={
            <div className="flex flex-col gap-6">
              <Skeleton className="w-[140px] h-[28px] md:w-[250px] md:h-[36px]" />
            </div>
          }
        >
          <Text
            className="text-xl md:text-3xl"
            weight="semibold"
            color="contrast"
          >
            {days}:{hours}:{minutes}:{seconds}
          </Text>
        </ClientSideOnly>
      </div>
    </>
  )
}
