import {
  Box,
  Flex,
  IconButton,
  Panel,
  Separator,
  Tooltip,
  BarsProgressIcon,
  HardDriveIcon,
  FileContractIcon,
  LockIcon,
  DiceIcon,
  HouseIcon,
  NextLink,
  Logo,
  navbarAppHeight,
} from '@siafoundation/design-system'
import { useSettings } from '@siafoundation/react-core'
import { routes } from '../../config/routes'
import { useWallets } from '../../contexts/wallets'
import { WalletNavItem } from './WalletNavItem'
import { useRouter } from 'next/router'
import { NavItem } from './NavItem'

export function Sidenav() {
  const { setSettings } = useSettings()
  const { wallets } = useWallets()
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
            {wallets.data?.map((wallet) => (
              <WalletNavItem key={wallet.name} wallet={wallet} />
            ))}
            <NavItem title="Blockchain node" route={routes.node.index}>
              <DiceIcon />
            </NavItem>
            <Tooltip
              content="Lock hostd"
              side="right"
              align="end"
              sideOffset={5}
              alignOffset={7}
            >
              <IconButton
                variant="ghost"
                onClick={() => {
                  setSettings({ password: '' })
                  router.replace(routes.home)
                }}
              >
                <LockIcon />
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
      </Panel>
    </Box>
  )
}
