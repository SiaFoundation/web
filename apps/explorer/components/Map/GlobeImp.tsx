'use client'

import GlobeTmpl from 'react-globe.gl'

function GlobeImp({
  ref,
  ...otherProps
}: React.ComponentProps<typeof GlobeTmpl>) {
  return <GlobeTmpl {...otherProps} ref={ref} />
}

export default GlobeImp
