import { useEffect, useState } from 'react'

let i = null

export function useDebugToggle() {
  const [toggle, setToggle] = useState<boolean>(false)
  useEffect(() => {
    i = setInterval(() => setToggle((t) => !t), 2000)
    return () => {
      clearInterval(i)
    }
  }, [])

  return toggle
}
