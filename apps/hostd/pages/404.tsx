import { Redirect } from '../components/Redirect'
import { Layout, useLayoutProps } from '../components/Redirect/Layout'
import { routes } from '../config/routes'

export default function Page() {
  return <Redirect route={routes.home} />
}

Page.Layout = Layout
Page.useLayoutProps = useLayoutProps
