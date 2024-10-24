import '../config/style.css'
import { NextAppCsr } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { Providers } from '../config/providers'
import { routes } from '../config/routes'
import { rootFontClasses } from '@siafoundation/fonts'
import { hostStateRoute } from '@siafoundation/hostd-types'
import { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
  Layout: ({ children }: { children: React.ReactElement }) => React.ReactNode
  useLayoutProps: () => Record<string, unknown>
}

type AppPropsWithLayout = AppProps<{
  fallback?: Record<string, unknown>
}> & {
  Component: NextPageWithLayout
}

export default function App(props: AppPropsWithLayout) {
  return (
    <NextAppCsr
      className={rootFontClasses}
      fallback={props.pageProps.fallback}
      daemonExplorerInfoRoute={hostStateRoute}
      passwordProtectRequestHooks
      lockRoutes={routes}
    >
      <Providers>
        <AppCore {...props} />
      </Providers>
    </NextAppCsr>
  )
}

function AppCore({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout
  const layoutProps = Component.useLayoutProps()
  const { fallback, ...rest } = pageProps
  return (
    <Layout {...layoutProps}>
      <Component {...rest} />
    </Layout>
  )
}
