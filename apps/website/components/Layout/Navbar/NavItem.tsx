import { NavMenuItem, Text } from '@siafoundation/design-system'

type Props = {
  trigger: React.ReactNode
  title: React.ReactNode
  children: React.ReactNode
}

export function NavItem({ trigger, title, children }: Props) {
  return (
    <NavMenuItem trigger={trigger}>
      <div className="flex flex-col gap-3 pt-2 p-3">
        <Text color="subtle" noWrap>
          {title}
        </Text>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </NavMenuItem>
  )
}
