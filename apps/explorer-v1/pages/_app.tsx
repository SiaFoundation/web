import { ThemeProvider, Toaster } from '@siafoundation/design-system'
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider ssr>
      <Toaster />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
