import { Head } from '@siafoundation/next'

type Props = {
  appName: string
  title?: string
  children?: React.ReactNode
}

export function AppPageHead({ appName, title, children }: Props) {
  const fullTitle = title ? `${appName} - ${title}` : appName
  return (
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
    </Head>
  )
}
