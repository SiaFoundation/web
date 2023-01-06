import { copyToClipboard, Label } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import {
  CommandGroup,
  CommandItemRootInitialOnly,
  CommandItemRootSearchAndPage,
} from './Item'
import { useWalletAddress } from '@siafoundation/react-core'

const commandPage = 'Wallet'

type Props = {
  page: string
  pushPage: (page: string) => void
}

export function CommandKWallet({ page, pushPage }: Props) {
  const { openDialog, closeDialog } = useDialog()
  const router = useRouter()
  const address = useWalletAddress()
  return (
    <CommandGroup
      currentPage={page}
      commandPage={commandPage}
      heading={<Label>Wallet</Label>}
    >
      <CommandItemRootInitialOnly
        currentPage={page}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        Wallet
      </CommandItemRootInitialOnly>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.wallet.view)
          closeDialog()
        }}
      >
        View wallet transactions
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('sendSiacoin')
        }}
      >
        Send siacoin
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('addressDetails')
        }}
      >
        Receive siacoin
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('addressDetails')
        }}
      >
        View wallet address
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          copyToClipboard(address.data, 'wallet address')
          closeDialog()
        }}
      >
        Copy wallet address to clipboard
      </CommandItemRootSearchAndPage>
    </CommandGroup>
  )
}
