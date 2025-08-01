import { SidenavItem } from '@siafoundation/design-system'
import {
  BarsProgressIcon,
  BugIcon,
  DatabaseIcon,
} from '@siafoundation/react-icons'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'

export function IndexdSidenav() {
  const { openDialog } = useDialog()
  return (
    <>
      <SidenavItem title="Data" route={routes.home}>
        <DatabaseIcon />
      </SidenavItem>
      <SidenavItem title="Configuration" route={routes.config.index}>
        <BarsProgressIcon />
      </SidenavItem>
      <SidenavItem title="Bug report" onClick={() => openDialog('bugReport')}>
        <BugIcon />
      </SidenavItem>
    </>
  )
}
