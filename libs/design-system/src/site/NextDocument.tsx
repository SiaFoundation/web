import DefaultNextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { getCssText } from '../config/theme'

export class NextDocument extends DefaultNextDocument {
  override render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
