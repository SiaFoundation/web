import { MutableRefObject } from 'react'
import GlobeTmpl, { GlobeMethods } from 'react-globe.gl'

const GlobeImp = ({
  ref,
  ...otherProps
}: Omit<React.ComponentProps<typeof GlobeTmpl>, 'ref'> & {
  ref: React.Ref<GlobeMethods>
}) => <GlobeTmpl {...otherProps} ref={ref as MutableRefObject<GlobeMethods>} />

export default GlobeImp
