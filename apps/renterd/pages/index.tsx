import { Home } from '../components/Home'
import { Layout, useLayoutProps } from '../components/Home/Layout'

export default function Page() {
  return <Home />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
