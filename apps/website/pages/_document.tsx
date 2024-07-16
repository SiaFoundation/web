'use client'

import { rootFontClasses } from '@siafoundation/fonts'
import DefaultNextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export default class NextDocument extends DefaultNextDocument {
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
