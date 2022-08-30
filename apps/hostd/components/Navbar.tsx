import { Flex, NavbarApp } from '@siafoundation/design-system'
import { routes } from '../config/routes'

type Props = {
  title?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function Navbar({ title, filters, actions }: Props) {
  return (
    <NavbarApp appName={title} homeHref={routes.home}>
      <Flex gap="2" align="center" justify="between">
        <Flex gap="1" align="center">
          {filters}
        </Flex>
        <Flex gap="2" align="center">
          <Flex gap="1" align="center">
            {actions}
          </Flex>
          {/* <UserMenu size="2" /> */}
        </Flex>
      </Flex>
    </NavbarApp>
  )
}
