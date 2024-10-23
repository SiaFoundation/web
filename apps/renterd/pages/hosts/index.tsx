import { Hosts } from '../../components/Hosts'
import { Layout, useLayoutProps } from '../../components/Hosts/Layout'

export default function Page() {
  return <Hosts />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
