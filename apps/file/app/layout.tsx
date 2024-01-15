'use client'

import { Container, ScrollArea } from '@siafoundation/design-system'
import { Providers } from '../config/providers'
import '../config/style.css'
import { rootFontClasses } from '@siafoundation/fonts'
import Navbar from '../components/Home/Navbar'
import { Subnav } from '../components/Home/Subnav'

// export function generateMetadata(): Metadata {
//   const title = 'file.dev'
//   const description = 'Decentralized files for everyone.'
//   const url = 'https://file.dev'
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: title,
//     },
//   }
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={rootFontClasses}>
      <body className="h-screen">
        <Providers>
          <ScrollArea>
            <Container>
              <Navbar />
              <Subnav />
              {children}
            </Container>
          </ScrollArea>
        </Providers>
      </body>
    </html>
  )
}
