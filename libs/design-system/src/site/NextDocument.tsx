import { cx } from 'class-variance-authority'
import DefaultNextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { mono, sans } from '../config/fonts'

export class NextDocument extends DefaultNextDocument {
  override render() {
    return (
      <Html lang="en" className={cx(sans.variable, mono.variable)}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
