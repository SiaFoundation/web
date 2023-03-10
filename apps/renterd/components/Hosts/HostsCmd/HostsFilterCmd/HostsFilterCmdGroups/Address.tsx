import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'
import { useDialog } from '../../../../../contexts/dialog'

export const contractFilterAddressPage = {
  namespace: 'contracts/filterAddress',
  label: 'Hosts filter by address',
}

const options = [
  {
    id: 'addressContains',
    value: 'addressContains',
    label: 'Address contains',
  },
]

export function AddressCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: () => void
}) {
  const { openDialog } = useDialog()
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractFilterAddressPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={contractFilterAddressPage}
          onSelect={() => {
            select()
            openDialog('hostsFilterAddress')
          }}
        >
          {o.label}
        </CommandItemSearch>
      ))}
    </CommandGroup>
  )
}
