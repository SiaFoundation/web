import React from 'react'
import { Flex } from './Flex'
import { Container } from './Container'
import { Box } from './Box'

type Props = React.ComponentProps<typeof Box> & {
  gap?: React.ComponentProps<typeof Flex>['gap']
  size?: React.ComponentProps<typeof Container>['size']
  variant?: 'default' | 'gradient' | 'waves'
}

export const Section = React.forwardRef<React.ElementRef<typeof Box>, Props>(
  ({ children, gap = '7', size, ...props }, ref) => (
    <Box as="section" {...props} ref={ref}>
      <Container size={size}>
        <Flex direction="column" gap={gap}>
          {children}
        </Flex>
      </Container>
    </Box>
  )
)
