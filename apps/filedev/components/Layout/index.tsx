import { routes } from '../../config/routes'
import { Search } from './Search'
import { appName } from '../../config'
import { NavDropdownMenu } from './NavDropdownMenu'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="relative h-full bg-gray-100 dark:bg-graydark-50 overflow-hidden">
      <div className="relative z-10 h-full overflow-y-auto">
        <Navbar appName={appName} homeHref={routes.home.index}>
          <Search />
          <NavDropdownMenu />
        </Navbar>
        <div className="flex flex-col">
          <div className="flex flex-col gap-5 pt-5">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
