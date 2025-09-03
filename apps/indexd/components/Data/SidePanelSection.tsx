import { Separator, Text } from '@siafoundation/design-system'
import { ReactNode } from 'react'

export function SidePanelSection({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <>
      <Separator className="first-of-type:hidden mt-4 mb-2" />
      <Text size="16" weight="medium" className="mb-2">
        {heading}
      </Text>
      {children}
    </>
  )
}
