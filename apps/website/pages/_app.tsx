import { MDXProvider } from '@mdx-js/react'
import { initGlobalStyles } from '@siafoundation/design-system'
import { components } from '../config/mdx'

function App({ Component, pageProps }) {
  initGlobalStyles()

  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App
