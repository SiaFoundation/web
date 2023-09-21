import { Layout } from '../components/Layout'
import '../config/style.css'
import { NextAppSsrAppRouter } from '@siafoundation/design-system'
import { appLink } from '../config'
import { IBM_Plex_Sans, IBM_Plex_Mono } from '@next/font/google'
import { cx } from 'class-variance-authority'
import Script from 'next/script'

const sans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const mono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'Explorer',
  description: 'Sia blockchain explorer',
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
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(sans.variable, mono.variable)}
    >
      <body>
        <NextAppSsrAppRouter>
          <Layout>{children}</Layout>
        </NextAppSsrAppRouter>
      </body>
      <Script
        id="fathom"
        strategy="afterInteractive"
        src="https://cdn.usefathom.com/script.js"
        data-site="LOLUTYWQ"
      />
    </html>
  )
}
