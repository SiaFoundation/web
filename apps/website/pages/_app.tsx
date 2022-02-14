import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from '@siafoundation/design-system'
import { components } from '../config/mdx'

function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </MDXProvider>
  )
}

export default App
