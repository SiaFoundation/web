'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from '@technically/lodash'

/**
 * A hook that allows you to create a state map that can be updated thousands
 * of times per second directly with the setter function, but only updates the
 * render state every `throttleMs` milliseconds.
 *
 * @param initialValue - The initial value of the map.
 * @param throttleMs - The throttle time in milliseconds.
 * @returns A tuple containing the current value of the map, a setter function,
 * and the throttled value.
 */
export function useThrottledStateMap<T extends Record<string, unknown>>(
  initialValue: T,
  throttleMs = 1000,
): [T, (value: T | ((prev: T) => T)) => void, T] {
  // Real-time value in ref.
  const valueRef = useRef<T>(initialValue)
  // Throttled state for renders.
  const [throttledValue, setThrottledValue] = useState<T>(initialValue)

  // Throttled sync function.
  const sync = useMemo(
    () =>
      throttle(
        () => {
          setThrottledValue({ ...valueRef.current })
        },
        throttleMs,
        {
          trailing: true,
        },
      ),
    [throttleMs],
  )

  // Cleanup throttle on unmount.
  useEffect(() => {
    return () => {
      sync.cancel()
    }
  }, [sync])

  // Setter that updates ref and triggers throttled sync.
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const nextValue =
        value instanceof Function ? value(valueRef.current) : value
      valueRef.current = nextValue
      sync()
    },
    [sync],
  )

  return [valueRef.current, setValue, throttledValue]
}
