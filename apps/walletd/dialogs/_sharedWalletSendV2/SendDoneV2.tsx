import { Text } from '@siafoundation/design-system'
import { CheckmarkFilled32 } from '@siafoundation/react-icons'
import { SendReceiptV2 } from './SendReceiptV2'
import { SendParamsV2 } from './typesV2'

type Props = {
  params: SendParamsV2
  transactionId?: string
}

export function SendDoneV2({ params, transactionId }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SendReceiptV2 params={params} transactionId={transactionId} />
      <div className="flex flex-col items-center justify-center gap-2 my-4">
        <Text>
          <CheckmarkFilled32 />
        </Text>
        <Text>Transaction successfully broadcast.</Text>
      </div>
    </div>
  )
}
