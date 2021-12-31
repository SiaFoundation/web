import { resetStyles } from '../config/reset'

function App({ Component, pageProps }) {
  resetStyles()

  return <Component {...pageProps} />
}

export default App
