import {
  AddAlt32,
  Blockchain32,
  Box,
  Flex,
  IconButton,
  Locked32,
  Logo,
  NextLink,
  Panel,
  Separator,
  Tooltip,
} from '@siafoundation/design-system'
import { useSettings } from '@siafoundation/react-core'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { fakeWallets } from '../../lib/fakeWallets'
import { WalletButton } from './WalletButton'
import { useRouter } from 'next/router'

export function Sidenav() {
  const { setSettings } = useSettings()
  const { openDialog } = useDialog()
  const router = useRouter()
  return (
    <Box
      css={{
        position: 'relative',
        width: '100px',
        zIndex: 1,
      }}
    >
      <Panel
        css={{
          margin: '-2px 0',
          height: 'calc(100% + 4px)',
          padding: '$3 0',
          borderRadius: 0,
        }}
      >
        <Flex
          direction="column"
          gap="3"
          align="center"
          css={{ height: '100%' }}
        >
          <Flex direction="column" gap="4" align="center">
            {fakeWallets.map((wallet) => (
              <WalletButton key={wallet.name} {...wallet} />
            ))}
          </Flex>
          <Tooltip align="start" content="Add wallet">
            <IconButton variant="ghost" onClick={() => openDialog('addWallet')}>
              <AddAlt32 />
            </IconButton>
          </Tooltip>
          <Box css={{ flex: 1 }} />
          <Separator size="100" pad="0" />
          <Tooltip align="start" content="Advanced blockchain view">
            <IconButton
              variant="ghost"
              onClick={() => router.push(routes.advanced)}
            >
              <Blockchain32 />
            </IconButton>
          </Tooltip>
          <Tooltip align="start" content="Lock siad">
            <IconButton
              variant="ghost"
              onClick={() => setSettings({ password: '' })}
            >
              <Locked32 />
            </IconButton>
          </Tooltip>
        </Flex>
      </Panel>
    </Box>
  )
}
