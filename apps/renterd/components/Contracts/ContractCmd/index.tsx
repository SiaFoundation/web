import { CommandItemNav } from '../../CmdRoot/Item'
import { ContractFilterCmd } from './ContractFilterCmd'
import { Page } from '../../CmdRoot/types'

export const commandPage = {
  namespace: 'contracts',
  label: 'Contracts',
}

export function ContractCmd({
  currentPage,
  parentPage,
  pushPage,
  beforeSelect,
  afterSelect,
}: {
  currentPage: Page
  parentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
  pushPage: (page: Page) => void
}) {
  return (
    <>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={parentPage}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        {commandPage.label}
      </CommandItemNav>
      <ContractFilterCmd
        parentPage={commandPage}
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
        pushPage={pushPage}
      />
    </>
  )
}
