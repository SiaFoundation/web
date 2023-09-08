'use client'

import DefaultNextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export class NextDocument extends DefaultNextDocument {
  override render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
