import dynamic from 'next/dynamic'
import { type MutableRefObject, forwardRef } from 'react'
import type { GlobeMethods } from 'react-globe.gl'

const GlobeGl = dynamic(() => import('./GlobeImp'), {
  ssr: false,
})

export const GlobeDyn = forwardRef(function ReactGlobe(
  props: Omit<React.ComponentProps<typeof GlobeGl>, 'forwardRef'>,
  ref: MutableRefObject<GlobeMethods>,
) {
  return <GlobeGl {...props} forwardRef={ref} />
})
