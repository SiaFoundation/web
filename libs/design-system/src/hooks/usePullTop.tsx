import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'

const cooldown = 300
const count = 5

export function usePullTop(id: string, onTrigger: () => void) {
  // Keep primary data on a ref for instant updates, and then sync up the state to trigger re-renders
  const ref = useRef({
    positions: [] as number[],
  })
  const [positions, setPositions] = useState<number[]>([])

  useEffect(() => {
    if (!onTrigger) {
      return
    }

    const element = document.getElementById(id)
    if (!element) {
      return
    }

    const updatePosition = throttle(() => {
      const top = element?.scrollTop
      ref.current.positions = [top, ...ref.current.positions].slice(0, count)
      if (
        ref.current.positions.length >= count &&
        !ref.current.positions.find((p) => p !== 0)
      ) {
        onTrigger()
        ref.current.positions = []
      }
      setPositions(ref.current.positions)
    }, cooldown)

    window.addEventListener('mousewheel', updatePosition, {
      passive: true,
    })
    window.addEventListener('touchmove', updatePosition, {
      passive: true,
    })

    updatePosition()
    return () => {
      window.removeEventListener('mousewheel', updatePosition)
      window.removeEventListener('touchmove', updatePosition)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTrigger])

  return positions
}
