import GlobeTmpl, { GlobeMethods } from 'react-globe.gl'

const GlobeImp = ({
  ref,
  ...otherProps
}: React.ComponentProps<typeof GlobeTmpl> & {
  ref: React.Ref<GlobeMethods>
}) => <GlobeTmpl {...otherProps} ref={ref} />

export default GlobeImp
