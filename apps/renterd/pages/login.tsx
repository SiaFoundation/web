import { Login } from '../components/Login'
import { Layout, useLayoutProps } from '../components/Login/Layout'

export default function Page() {
  return <Login />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
