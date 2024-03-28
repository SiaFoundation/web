import { Text } from '@siafoundation/design-system'
import { CheckmarkFilled32 } from '@siafoundation/react-icons'
import { SendReceipt } from './SendReceipt'
import { SendParams } from './types'

type Props = {
  params: SendParams
  transactionId?: string
}

export function SendDone({ params, transactionId }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SendReceipt params={params} transactionId={transactionId} />
      <div className="flex flex-col items-center justify-center gap-2 my-4">
        <Text>
          <CheckmarkFilled32 />
        </Text>
        <Text>Transaction successfully broadcast.</Text>
      </div>
    </div>
  )
}
