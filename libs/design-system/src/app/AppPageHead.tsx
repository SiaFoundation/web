import Head from 'next/head'

type Props = {
  appName: string
  title?: string
  children?: React.JSX.Element
}

export function AppPageHead({ appName, title, children }: Props) {
  const fullTitle = title ? `${appName} - ${title}` : appName
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content={appName} />
      <link
        rel="manifest"
        href="/manifest.webmanifest"
        crossOrigin="use-credentials"
      />
      {children}
      <title>{fullTitle}</title>
    </Head>
  )
}
