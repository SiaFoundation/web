import { throttle } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'

const throttleDelay = 300

const countThresholdTriggerStart = 3
const countThresholdTriggerTransition = 10

const topMaximumTriggerValue = 60
const topResetThreshold = 80
const noActivityResetThreshold = 5_000

export function usePullTop(
  id: string,
  isActive: boolean,
  onTrigger: () => void
) {
  // Keep primary data on a ref for instant updates, and then sync up the state to trigger re-renders
  const ref = useRef({
    positions: [] as number[],
  })
  const [positions, setPositions] = useState<number[]>([])

  // Reset after a no scroll activity for certain time
  useEffect(() => {
    if (!ref.current.positions.length) {
      return
    }
    const noActivityTimeout = setTimeout(() => {
      ref.current.positions = []
      setPositions(ref.current.positions)
    }, noActivityResetThreshold)
    return () => {
      clearTimeout(noActivityTimeout)
    }
  }, [positions])

  const updatePosition = useMemo(
    () =>
      throttle(() => {
        const element = document.getElementById(id)
        if (!element) {
          return
        }
        const top = element?.scrollTop
        if (top > topResetThreshold) {
          ref.current.positions = []
        }
        ref.current.positions = [top, ...ref.current.positions].slice(
          0,
          countThresholdTriggerTransition
        )
        if (
          ref.current.positions.length >= countThresholdTriggerTransition &&
          !ref.current.positions.find((p) => p > topMaximumTriggerValue)
        ) {
          onTrigger()
          ref.current.positions = []
        }
        setPositions(ref.current.positions)
      }, throttleDelay),
    [ref, setPositions, id, onTrigger]
  )

  useEffect(() => {
    if (!isActive) {
      return
    }
    const main = document.getElementById('main-scroll')
    if (!main) {
      return
    }
    main.addEventListener('wheel', updatePosition, {
      passive: true,
    })
    main.addEventListener('touchmove', updatePosition, {
      passive: true,
    })

    updatePosition()
    return () => {
      main.removeEventListener('wheel', updatePosition)
      main.removeEventListener('touchmove', updatePosition)
    }
  }, [isActive, updatePosition])

  return (
    positions.filter((i) => i <= topMaximumTriggerValue).length >
    countThresholdTriggerStart
  )
}
