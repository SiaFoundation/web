'use client'

import DefaultNextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
// import { rootFontClasses } from '@siafoundation/fonts'

export default class NextDocument extends DefaultNextDocument {
  override render() {
    return (
      <Html lang="en">
        <Head />
        {/* <body className={rootFontClasses}> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
