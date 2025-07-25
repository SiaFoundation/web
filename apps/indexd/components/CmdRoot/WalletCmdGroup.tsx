import { copyToClipboard } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/navigation'
import { useDialog } from '../../contexts/dialog'
import { CommandGroup, CommandItemNav, CommandItemSearch } from './Item'
import { useWallet } from '@siafoundation/indexd-react'
import { Page } from './types'

const commandPage = {
  namespace: 'wallet',
  label: 'Wallet',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function WalletCmdGroup({ currentPage, parentPage, pushPage }: Props) {
  const { openDialog, closeDialog } = useDialog()
  const router = useRouter()
  const wallet = useWallet()
  return (
    <CommandGroup currentPage={currentPage} commandPage={commandPage}>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        {commandPage.label}
      </CommandItemNav>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.wallet.view)
          closeDialog()
        }}
      >
        View wallet transactions
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('sendSiacoin')
        }}
      >
        Send siacoin
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('addressDetails')
        }}
      >
        Receive siacoin
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('addressDetails')
        }}
      >
        View wallet address
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        disabled={!wallet.data?.address}
        onSelect={() => {
          if (wallet.data?.address) {
            copyToClipboard(wallet.data.address, 'wallet address')
            closeDialog()
          }
        }}
      >
        Copy wallet address to clipboard
      </CommandItemSearch>
    </CommandGroup>
  )
}
