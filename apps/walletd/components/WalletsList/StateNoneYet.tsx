import { Heading } from '@siafoundation/design-system'
import { WalletAddSelectType } from '../WalletAddSelectType'

export function StateNoneYet() {
  return (
    <div className="flex w-full justify-center">
      <div className="mt-[100px] max-w-[800px]">
        <div className="flex flex-col">
          <Heading className="mb-4">Add a wallet to get started.</Heading>
          <WalletAddSelectType />
        </div>
      </div>
    </div>
  )
}
