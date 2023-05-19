import React from 'react'
import pattern from '../assets/background-pattern.jpg'
import { getImageProps } from '../lib/image'

type Props = {
  children?: React.ReactNode
}

const patternSrc = getImageProps(pattern).src

export function AppBackdrop({ children }: Props) {
  return (
    <div className="relative -z-10 opacity-100 pointer-events-none">
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-white dark:bg-graydark-50" />
      <div
        className="fixed top-0 left-0 right-0 w-[200vw] h-[200vh] opacity-30 z-30 translate-x[-50vw] translate-y[-100vh]"
        style={{
          backgroundImage: `url(${patternSrc})`,
          backgroundPositionY: 'bottom',
          backgroundSize: 'auto',
        }}
      />
      <div className="fixed top-0 left-0 right-0 bottom-0 opacity-95 z-40 bg-white dark:bg-graydark-50" />
      {children}
    </div>
  )
}
