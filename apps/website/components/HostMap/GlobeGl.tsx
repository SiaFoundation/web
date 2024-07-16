import type { MutableRefObject } from 'react'
import GlobeTmpl, { type GlobeMethods } from 'react-globe.gl'

const GlobeGl = ({
  forwardRef,
  ...otherProps
}: React.ComponentProps<typeof GlobeTmpl> & {
  forwardRef: MutableRefObject<GlobeMethods>
}) => <GlobeTmpl {...otherProps} ref={forwardRef} />

export default GlobeGl
