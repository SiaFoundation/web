import { resetStyles } from '../config/reset'

export default function App({ Component, pageProps }) {
  resetStyles()

  return <Component {...pageProps} />
}
