import { Alerts } from '../../components/Alerts'
import { Layout, useLayoutProps } from '../../components/Alerts/Layout'

export default function Page() {
  return <Alerts />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
