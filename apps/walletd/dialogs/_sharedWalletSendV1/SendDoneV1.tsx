import { Text } from '@siafoundation/design-system'
import { CheckmarkFilled32 } from '@siafoundation/react-icons'
import { SendReceiptV1 } from './SendReceiptV1'
import { SendParamsV1 } from './typesV1'

type Props = {
  params: SendParamsV1
  transactionId?: string
}

export function SendDoneV1({ params, transactionId }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SendReceiptV1 params={params} transactionId={transactionId} />
      <div className="flex flex-col items-center justify-center gap-2 my-4">
        <Text>
          <CheckmarkFilled32 />
        </Text>
        <Text>Transaction successfully broadcast.</Text>
      </div>
    </div>
  )
}
