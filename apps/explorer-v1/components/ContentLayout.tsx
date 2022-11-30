import { Container, Panel } from '@siafoundation/design-system'
import React from 'react'

type Props = {
  panel: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function ContentLayout({ panel, children, className }: Props) {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-12">
          <Panel className="p-4 md:p-8 !rounded-lg !border-3 !border-gray-1100 dark:!border-graydark-500">
            {panel}
          </Panel>
        </div>
      </Container>
      <Container size="3" className={className}>
        {children}
      </Container>
    </>
  )
}
