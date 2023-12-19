import throttle from 'lodash-es/throttle'
import { useEffect, useState } from 'react'

export function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)
  useEffect(() => {
    const el = document.getElementById('main-scroll')
    const update = throttle(() => setScrollTop(el.scrollTop), 200)
    el.addEventListener('scroll', update, false)
    return () => {
      el.removeEventListener('scroll', update)
    }
  })
  return { scrollTop }
}
