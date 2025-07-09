'use client'

import { MutableRefObject } from 'react'
import GlobeTmpl, { GlobeMethods } from 'react-globe.gl'

function GlobeImp({
  ref,
  ...otherProps
}: Omit<React.ComponentProps<typeof GlobeTmpl>, 'ref'> & {
  ref?: React.Ref<GlobeMethods>
}) {
  return (
    <GlobeTmpl {...otherProps} ref={ref as MutableRefObject<GlobeMethods>} />
  )
}

export default GlobeImp
