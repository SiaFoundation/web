import React from 'react'
import { Container } from './Container'

export const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    size?: React.ComponentProps<typeof Container>['size']
    background?: React.ReactNode
  }
>(({ children, background, size, className, ...props }, ref) => (
  <section {...props} ref={ref} className={className}>
    {background}
    <Container size={size} className="relative z-10">
      <div className="flex flex-col">{children}</div>
    </Container>
  </section>
))
