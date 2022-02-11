import { Background, Box, ScrollArea } from '@siafoundation/design-system'
import { Header } from './Header'

export function Layout({ children }) {
  return (
    <Box
      as="main"
      css={{
        bc: '$loContrast',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ScrollArea>
        <Header />
        <Background />
        {children}
      </ScrollArea>
    </Box>
  )
}
