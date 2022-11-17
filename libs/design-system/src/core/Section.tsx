import React from 'react'
import { Container } from './Container'

export const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    size?: React.ComponentProps<typeof Container>['size']
  }
>(({ children, size, className, ...props }, ref) => (
  <section {...props} ref={ref} className={className}>
    <Container size={size}>
      <div className="flex flex-col">{children}</div>
    </Container>
  </section>
))
