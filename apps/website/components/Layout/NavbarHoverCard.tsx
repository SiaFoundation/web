import { HoverCard, Text } from '@siafoundation/design-system'

type Props = {
  trigger: React.ReactNode
  title: React.ReactNode
  children: React.ReactNode
}

export function NavbarHoverCard({ trigger, title, children }: Props) {
  return (
    <HoverCard
      rootProps={{
        openDelay: 200,
        closeDelay: 200,
      }}
      contentProps={{
        sideOffset: 5,
        className: '!rounded-lg',
      }}
      trigger={trigger}
    >
      <div className="flex flex-col gap-3 pt-2 p-3">
        <Text color="subtle">{title}</Text>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </HoverCard>
  )
}
