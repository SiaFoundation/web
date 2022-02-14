import React from 'react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { getCssText } from '@siafoundation/design-system'

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body style={{ overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
