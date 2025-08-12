import '../config/style.css'
import { NextAppCsr } from '@siafoundation/design-system'
import { rootFontClasses } from '@siafoundation/fonts'
import { routes } from '../config/routes'
import { Providers } from '../config/providers'

export const metadata = {
  title: 'indexd',
  description: 'Sia indexd daemon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={rootFontClasses}>
      <body>
        <NextAppCsr passwordProtectRequestHooks lockRoutes={routes}>
          <Providers>{children}</Providers>
        </NextAppCsr>
      </body>
    </html>
  )
}
