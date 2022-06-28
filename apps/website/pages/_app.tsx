import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from '@siafoundation/design-system'
import { SWRConfig } from 'swr'
import { components } from '../config/mdx'

function App({ Component, pageProps, fallback = {} }) {
  return (
    <SWRConfig value={{ fallback }}>
      <MDXProvider components={components}>
        <ThemeProvider ssr>
          <Component {...pageProps} />
        </ThemeProvider>
      </MDXProvider>
    </SWRConfig>
  )
}

export default App
