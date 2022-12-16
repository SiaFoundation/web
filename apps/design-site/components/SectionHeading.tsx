import { SectionHeading as DSSectionHeading } from '@siafoundation/design-system'

type Props = {
  id?: string
  children: string
}

export function SectionHeading({ id, children }: Props) {
  return (
    <DSSectionHeading id={id} size="32" className="pt-40">
      {children}
    </DSSectionHeading>
  )
}
