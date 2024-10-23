import { Config } from '../../components/Config'
import { Layout, useLayoutProps } from '../../components/Config/Layout'

export default function Page() {
  return <Config />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
