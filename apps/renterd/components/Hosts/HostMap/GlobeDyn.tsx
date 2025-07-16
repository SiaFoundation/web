import dynamic from 'next/dynamic'

const GlobeGl = dynamic(() => import('./GlobeImp'), {
  ssr: false,
})

export function GlobeDyn(props: React.ComponentProps<typeof GlobeGl>) {
  return <GlobeGl {...props} />
}
