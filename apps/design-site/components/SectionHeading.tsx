import { Heading, Link, Link20 } from '@siafoundation/design-system'

type Props = {
  id?: string
  children: string
}

export function SectionHeading({ id, children }: Props) {
  const cId = id || children.toLowerCase()
  return (
    <div className="flex flex-col gap-6 items-start pt-6 pb-12">
      <Link href={`#${cId}`} id={cId} className="relative">
        <Link20 className="absolute top-1 -left-7 hidden md:block" />
        <Heading size="32">{children}</Heading>
      </Link>
    </div>
  )
}
