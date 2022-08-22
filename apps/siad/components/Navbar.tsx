import { Flex, NavbarApp } from '@siafoundation/design-system'
import { routes } from '../config/routes'
import { UserMenu } from './User/UserMenu'

type Props = {
  title?: string
  actions?: React.ReactNode
}

export function Navbar({ title, actions }: Props) {
  return (
    <NavbarApp appName={title} homeHref={routes.home}>
      <Flex gap="2" align="center">
        <Flex gap="1" align="center">
          {actions}
        </Flex>
        <UserMenu size="2" />
      </Flex>
    </NavbarApp>
  )
}
