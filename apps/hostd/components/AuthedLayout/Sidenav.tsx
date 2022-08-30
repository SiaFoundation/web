import {
  Box,
  Flex,
  Panel,
  Separator,
  BarsProgressIcon,
  HardDriveIcon,
  FileContractIcon,
  LockIcon,
  DiceIcon,
  HouseIcon,
  NextLink,
  Logo,
  navbarAppHeight,
  GearIcon,
} from '@siafoundation/design-system'
import { useSettings } from '@siafoundation/react-core'
import { routes } from '../../config/routes'
import { NavItemWallet } from './NavItemWallet'
import { useRouter } from 'next/router'
import { NavItem } from './NavItem'
import { useDialog } from '../../contexts/dialog'

export function Sidenav() {
  const { setSettings } = useSettings()
  const { openDialog } = useDialog()
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
              <NavItem title="Dashboard" route={routes.home}>
                <HouseIcon />
              </NavItem>
              <NavItem title="Storage" route={routes.storage.index}>
                <HardDriveIcon />
              </NavItem>
              <NavItem title="Contracts" route={routes.contracts.index}>
                <FileContractIcon />
              </NavItem>
              <NavItem title="Configuration" route={routes.config.index}>
                <BarsProgressIcon />
              </NavItem>
            </Flex>
            <Box css={{ flex: 1 }} />
            <Separator size="100" pad="0" />
            <NavItemWallet />
            <NavItem title="Blockchain node" route={routes.node.index}>
              <DiceIcon />
            </NavItem>
            <NavItem title="Settings" onClick={() => openDialog('settings')}>
              <GearIcon />
            </NavItem>
            <NavItem
              title="Lock hostd"
              onClick={() => {
                setSettings({ password: '' })
                router.replace(routes.home)
              }}
            >
              <LockIcon />
            </NavItem>
          </Flex>
        </Flex>
      </Panel>
    </Box>
  )
}
