import { Layout } from '../components/Layout'
import '../config/style.css'
import { NextAppSsrAppRouter } from '@siafoundation/design-system'
import { appLink } from '../config'

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAppSsrAppRouter>
          <Layout>{children}</Layout>
        </NextAppSsrAppRouter>
      </body>
    </html>
  )
}
