'use client'

import { forwardRef, type ForwardedRef, type MutableRefObject } from 'react'
import dynamic from 'next/dynamic'
import { type GlobeMethods } from 'react-globe.gl'

const GlobeGl = dynamic(() => import('./GlobeImp'), {
  ssr: false,
})

export const GlobeDyn = forwardRef<
  GlobeMethods,
  Omit<React.ComponentProps<typeof GlobeGl>, 'forwardRef'>
>(function ReactGlobe(props, ref: ForwardedRef<GlobeMethods>) {
  return (
    <GlobeGl {...props} forwardRef={ref as MutableRefObject<GlobeMethods>} />
  )
})
