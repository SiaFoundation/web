import { useRouter } from 'next/router'
import { useSettings } from '@siafoundation/react-core'
import { LockIcon } from '../../icons/LockIcon'
import { DiceIcon } from '../../icons/DiceIcon'
import { GearIcon } from '../../icons/GearIcon'
import { Box } from '../../core/Box'
import { Flex } from '../../core/Flex'
import { Panel } from '../../core/Panel'
import { Separator } from '../../core/Separator'
import { NextLink } from '../../core/Link'
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
    <Box
      css={{
        position: 'relative',
        width: '75px',
        overflow: 'hidden',
        flex: '0 0 auto',
        zIndex: 1,
      }}
    >
      <Panel
        css={{
          margin: '-2px 0',
          height: 'calc(100% + 4px)',
          borderRadius: 0,
        }}
      >
        <Flex direction="column" align="center" css={{ height: '100%' }}>
          <Flex
            css={{
              height: `${navbarAppHeight}px`,
              flex: '0 0 auto',
            }}
            justify="center"
            align="center"
          >
            <NextLink href={routes.home} css={{ textDecoration: 'none' }}>
              <Logo size={30} />
            </NextLink>
          </Flex>
          <Flex
            direction="column"
            gap="3"
            align="center"
            css={{ padding: '$1 0 $3', height: '100%' }}
          >
            <Flex direction="column" gap="3" align="center">
              {children}
            </Flex>
            <Box css={{ flex: 1 }} />
            <Separator size="100" pad="0" />
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
          </Flex>
        </Flex>
      </Panel>
    </Box>
  )
}
