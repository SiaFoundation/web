import { Container, Panel } from '@siafoundation/design-system'
import React from 'react'

type Props = {
  heading?: React.ReactNode
  panel?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function ContentLayout({ heading, panel, children, className }: Props) {
  return (
    <>
      {heading && <Container>{heading}</Container>}
      {panel && (
        <Container size="4">
          <Panel className="p-4">{panel}</Panel>
        </Container>
      )}
      {children && <Container className={className}>{children}</Container>}
    </>
  )
}
