import { WalletsList } from '../components/WalletsList'
import { Layout, useLayoutProps } from '../components/WalletsList/Layout'

export default function Page() {
  return <WalletsList />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
