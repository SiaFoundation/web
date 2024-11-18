import { Layout } from '../components/Layout'
import '../config/style.css'
import { NextAppSsrAppRouter } from '@siafoundation/design-system'
import { appLink } from '../config'
import Script from 'next/script'
// import { rootFontClasses } from '@siafoundation/fonts'

export const metadata = {
  title: 'filedev',
  description: 'Compare data storage services',
  metadataBase: new URL(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${process.env.PORT || 3000}`
      : appLink
  ),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang="en" suppressHydrationWarning className={rootFontClasses}>
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAppSsrAppRouter>
          <Layout>{children}</Layout>
        </NextAppSsrAppRouter>
      </body>
      {/* <Script
        id="fathom"
        strategy="afterInteractive"
        src="https://cdn.usefathom.com/script.js"
        data-site="LOLUTYWQ"
      /> */}
    </html>
  )
}
