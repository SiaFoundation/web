import { useRouter } from 'next/router'
import { useSettings } from '@siafoundation/react-core'
import { LockIcon } from '../../icons/LockIcon'
import { DiceIcon } from '../../icons/DiceIcon'
import { GearIcon } from '../../icons/GearIcon'
import { Panel } from '../../core/Panel'
import { Separator } from '../../core/Separator'
import { Link } from '../../core/Link'
import { Logo } from '../../core/Logo'
import { navbarAppHeight } from '../AppNavbar'
import { SidenavItemWallet } from './SidenavItemWallet'
import { SidenavItem } from './SidenavItem'

type Props = {
  routes: {
    home: string
    node: {
      index: string
    }
    wallet: {
      view: string
    }
  }
  openSettings: () => void
  children: React.ReactNode
}

export function Sidenav({ routes, openSettings, children }: Props) {
  const { setSettings } = useSettings()
  const router = useRouter()
  return (
    <Panel
      className="relative overflow-hidden z-10 h-full rounded-none border-y-0"
      style={{
        width: '75px',
        flex: '0 0 auto',
      }}
    >
      <div className="flex flex-col items-center h-full">
        <div
          className="flex items-center justify-center"
          style={{
            height: `${navbarAppHeight}px`,
            flex: '0 0 auto',
          }}
        >
          <Link href={routes.home} underline={false}>
            <Logo size={30} />
          </Link>
        </div>
        <div className="flex flex-col gap-5 items-center pt-3 pb-5 h-full">
          <div className="flex flex-col gap-5 items-center">{children}</div>
          <div className="flex-1" />
          <Separator className="w-full" />
          <SidenavItemWallet routes={routes} />
          <SidenavItem title="Blockchain node" route={routes.node.index}>
            <DiceIcon />
          </SidenavItem>
          <SidenavItem title="Settings" onClick={() => openSettings()}>
            <GearIcon />
          </SidenavItem>
          <SidenavItem
            title="Lock app"
            onClick={() => {
              setSettings({ password: '' })
              router.replace(routes.home)
            }}
          >
            <LockIcon />
          </SidenavItem>
        </div>
      </div>
    </Panel>
  )
}
