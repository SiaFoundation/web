import { MDXProvider } from '@mdx-js/react'
import { resetStyles } from '@siafoundation/design-system'
import { components } from '../config/mdx'

function App({ Component, pageProps }) {
  resetStyles()

  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App
