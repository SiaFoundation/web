import { ThemeProvider, Toaster } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
      <ThemeProvider ssr>
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}

export default App
