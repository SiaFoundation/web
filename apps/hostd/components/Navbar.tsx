import { Flex, AppBar } from '@siafoundation/design-system'
import { routes } from '../config/routes'
import { UserMenu } from './User/UserMenu'

type Props = {
  title?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function Navbar({ title, filters, actions }: Props) {
  return (
    <AppBar appName={title} homeHref={routes.home} variant="app">
      <Flex gap="2" align="center" justify="between">
        <Flex gap="1" align="center">
          {filters}
        </Flex>
        <Flex gap="2" align="center">
          <Flex gap="1" align="center">
            {actions}
          </Flex>
          <UserMenu size="2" />
        </Flex>
      </Flex>
    </AppBar>
  )
}
