import { Wallet } from '../../components/Wallet'
import { Layout, useLayoutProps } from '../../components/Wallet/Layout'

export default function Page() {
  return <Wallet />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
