import { useCallback } from 'react'
import { useIdleTimer } from 'react-idle-timer'

type Props = {
  enabled: boolean
  lock: () => void
  lockTimeout?: number
}

export function useAutoLock({ enabled, lock, lockTimeout }: Props) {
  const onIdle = useCallback(() => {
    lock()
  }, [lock])

  useIdleTimer({
    disabled: !enabled,
    onIdle,
    timeout: lockTimeout,
    throttle: 5_000,
    eventsThrottle: 5_000,
  })
}
