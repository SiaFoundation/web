import '../config/style.css'
import { NextAppSsrAppRouter } from '@siafoundation/design-system'
import { appLink } from '../config'
import Script from 'next/script'
import { rootFontClasses } from '@siafoundation/fonts'
import { cookies } from 'next/headers'
import { CurrencyID } from '@siafoundation/explored-types'
import { buildFallbackDataDefaultCurrencyId } from '@siafoundation/react-core'
import { buildFallbackDataExchangeRate } from '../lib/fallback'
import { buildFallbackDataExploredAddress } from '../lib/explored'

export const metadata = {
  title: 'Explorer',
  description: 'Sia blockchain explorer',
  metadataBase: new URL(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${process.env.PORT || 3000}`
      : appLink
  ),
}

function getUserCurrencyPreferenceCookie() {
  const cookieStore = cookies()
  const currency = cookieStore.get('currency')?.value as CurrencyID
  return currency || 'usd'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currency = getUserCurrencyPreferenceCookie()
  return (
    <html lang="en" suppressHydrationWarning className={rootFontClasses}>
      <body>
        <NextAppSsrAppRouter
          fallback={{
            // Pass the currency cookie value to the app settings provider so that
            // it initializes and server-renders with the user's prefered currency.
            ...buildFallbackDataDefaultCurrencyId(currency),
            // Pass the currency's initial exchange rate value to the exchange rate
            // hooks so that they initialize and server-render with the value.
            ...(await buildFallbackDataExchangeRate(currency)),
            // Pass any custom explored address to the client-side. The cookie is
            // only allowed in development mode and is used to point the explorer
            // to a local cluster.
            ...buildFallbackDataExploredAddress(),
          }}
        >
          {children}
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
