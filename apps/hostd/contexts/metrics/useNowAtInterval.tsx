import { useEffect, useState } from 'react'
import { DataInterval, getDataIntervalInMs } from './types'
import { hoursInMilliseconds } from '@siafoundation/units'

// now timestamp updated every interval
// used to reset the time range and keep the graph up to date
export function useNowAtInterval(dataInterval: DataInterval) {
  const [now, setNow] = useState(new Date().getTime())
  useEffect(() => {
    setNow(new Date().getTime())
    // set a minimum refresh rate of every 1 hour
    const minIntervalMs = hoursInMilliseconds(1)
    const intervalMs = Math.min(
      getDataIntervalInMs(dataInterval),
      minIntervalMs
    )
    const i = setInterval(() => {
      setNow(new Date().getTime())
    }, intervalMs)
    return () => clearInterval(i)
  }, [dataInterval])

  return now
}
