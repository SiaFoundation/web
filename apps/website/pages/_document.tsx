'use client'

import { rootFontClasses } from '@siafoundation/fonts'
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
        <body className={rootFontClasses}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
