import { AppBar } from '@siafoundation/design-system'
import { routes } from '../config/routes'
import { UserMenu } from './User/UserMenu'

type Props = {
  title?: string
  children?: React.ReactNode
}

export function Navbar({ title, children }: Props) {
  return (
    <AppBar appName="siad" homeHref={routes.home} variant="app">
      <UserMenu size="2" />
    </AppBar>
  )
}
