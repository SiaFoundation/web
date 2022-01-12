import { MDXProvider } from '@mdx-js/react'
import { components } from '../config/mdx'
import { resetStyles } from '../config/reset'

function App({ Component, pageProps }) {
  resetStyles()

  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App
