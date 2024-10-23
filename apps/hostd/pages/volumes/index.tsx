import { Volumes } from '../../components/Volumes'
import { Layout, useLayoutProps } from '../../components/Volumes/Layout'

export default function Page() {
  return <Volumes />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
