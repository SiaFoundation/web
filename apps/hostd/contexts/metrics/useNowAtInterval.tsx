import { useEffect, useState } from 'react'
import { DataInterval, getDataIntervalInMs } from './types'

// now timestamp updated every interval
// used to reset the time range and keep the graph up to date
export function useNowAtInterval(dataInterval: DataInterval) {
  const [now, setNow] = useState(new Date().getTime())
  useEffect(() => {
    setNow(new Date().getTime())
    const i = setInterval(() => {
      setNow(new Date().getTime())
      console.log('reset time range')
    }, getDataIntervalInMs(dataInterval))
    return () => clearInterval(i)
  }, [dataInterval])

  return now
}
