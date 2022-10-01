import { throttle } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'

const cooldown = 300
const count = 10
const countThreshold = 4
const topThreshold = 60
const resetThreshold = 80

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

  const updatePosition = useMemo(
    () =>
      throttle(() => {
        const element = document.getElementById(id)
        if (!element) {
          return
        }
        const top = element?.scrollTop
        if (top > resetThreshold) {
          ref.current.positions = []
        }
        ref.current.positions = [top, ...ref.current.positions].slice(0, count)
        if (
          ref.current.positions.length >= count &&
          !ref.current.positions.find((p) => p > topThreshold)
        ) {
          onTrigger()
          ref.current.positions = []
        }
        setPositions(ref.current.positions)
      }, cooldown),
    [ref, setPositions, id, onTrigger]
  )

  useEffect(() => {
    if (!isActive) {
      return
    }

    window.addEventListener('wheel', updatePosition, {
      passive: true,
    })
    window.addEventListener('touchmove', updatePosition, {
      passive: true,
    })

    updatePosition()
    return () => {
      window.removeEventListener('wheel', updatePosition)
      window.removeEventListener('touchmove', updatePosition)
    }
  }, [isActive, updatePosition])

  return positions.filter((i) => i <= topThreshold).length > countThreshold
}
