import { Box, Container, Flex } from '@siafoundation/design-system'
import React from 'react'
import { SwapNav } from './SwapNav'
import { SwapProgress } from './SwapProgress'

type Props = {
  children: React.ReactNode
}

export function SwapLayout({ children }: Props) {
  return (
    <Container
      size="1"
      css={{
        padding: '$9 0',
      }}
    >
      <Flex
        direction="column"
        gap="4"
        justify="center"
        css={{
          boxShadow:
            'rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px',
          backgroundColor: '#fff',
          borderRadius: '$4',
          padding: '$3',
        }}
      >
        <SwapNav />
        <SwapProgress />
        <Box>{children}</Box>
      </Flex>
    </Container>
  )
}
