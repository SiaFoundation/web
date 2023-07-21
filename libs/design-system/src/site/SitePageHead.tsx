import { webLinks } from '../data/webLinks'
import Head from 'next/head'
import Script from 'next/script'

type Props = {
  appName: string
  appLink: string
  title: string
  description: string
  image: string
  date?: string
  path: string
  analytics?: boolean
  children?: React.ReactNode
}

export function SitePageHead({
  appName,
  appLink,
  title,
  description,
  image,
  date,
  path,
  children,
  analytics = false,
}: Props) {
  const fullTitle = date ? title : `${appName} - ${title}`
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1ed660" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        {children}
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description}></meta>}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={webLinks.twitterHandle} />

        {/* Open Graph */}
        <meta property="og:url" content={`${appLink}${path}`} />
        <meta property="og:image" content={`${appLink}${image}`} />
        <meta property="og:site_name" content={appName} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        {date && <meta property="og:article:published_time" content={date} />}
      </Head>
      {analytics && (
        <Script
          id="fathom"
          strategy="afterInteractive"
          src="https://cdn.usefathom.com/script.js"
          data-site="LOLUTYWQ"
        />
      )}
    </>
  )
}
