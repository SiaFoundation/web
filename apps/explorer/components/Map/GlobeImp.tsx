'use client'

import { MutableRefObject } from 'react'
import GlobeTmpl, { GlobeMethods } from 'react-globe.gl'

const GlobeImp = ({
  forwardRef,
  ...otherProps
}: React.ComponentProps<typeof GlobeTmpl> & {
  forwardRef: MutableRefObject<GlobeMethods>
}) => <GlobeTmpl {...otherProps} ref={forwardRef} />

export default GlobeImp
