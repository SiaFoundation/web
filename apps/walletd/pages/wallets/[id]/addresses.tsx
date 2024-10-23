import { WalletAddresses } from '../../../components/WalletAddresses'
import {
  Layout,
  useLayoutProps,
} from '../../../components/WalletAddresses/Layout'

export default function Page() {
  return <WalletAddresses />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
