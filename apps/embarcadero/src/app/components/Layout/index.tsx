import { Box, ScrollArea } from '@siafoundation/design-system'
import React from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { SwapLayout } from './SwapLayout'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <ScrollArea>
      <Box
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none',
          width: '200vw',
          height: '200vh',
          '@light': {
            background:
              'radial-gradient(50% 50% at 50% 50%,$siaGreenA4 0,rgba(255,255,255,0) 100%)',
          },
          '@dark': {
            background:
              'radial-gradient(50% 50% at 50% 50%,black 0,rgba(255,255,255,0) 100%)',
          },
          transform: 'translate(-50vw,-100vh)',
          zIndex: -1,
        }}
      />
      <Navbar />
      <SwapLayout>{children}</SwapLayout>
      <Footer />
    </ScrollArea>
  )
}
