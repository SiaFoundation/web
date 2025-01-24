import {
  Text,
  ValueSc,
  ValueCopyable,
  ValueSf,
} from '@siafoundation/design-system'
import { SendParamsV2 } from './types'

type Props = {
  params: SendParamsV2
  transactionId?: string
}

export function SendReceiptV2({
  params: { receiveAddress, changeAddress, siacoin, siafund, fee },
  transactionId,
}: Props) {
  const totalSiacoin = siacoin.plus(fee)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Recipient address
        </Text>
        <ValueCopyable value={receiveAddress} type="address" />
      </div>
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Change address
        </Text>
        <ValueCopyable value={changeAddress} type="address" />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Amount
        </Text>
        <div className="flex relative gap-1 top-[-0.5px]">
          {siacoin.gt(0) && (
            <ValueSc
              size="14"
              value={siacoin}
              variant="value"
              dynamicUnits={false}
            />
          )}
          {siafund > 0 && <ValueSf size="14" value={siafund} variant="value" />}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Network fee
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc size="14" value={fee} variant="value" dynamicUnits={false} />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Text color="verySubtle" noWrap>
          Total
        </Text>
        <div className="flex relative gap-1 top-[-0.5px]">
          {siacoin.gt(0) && (
            <ValueSc
              size="14"
              value={totalSiacoin}
              variant="value"
              dynamicUnits={false}
            />
          )}
          {siafund > 0 && <ValueSf size="14" value={siafund} variant="value" />}
        </div>
      </div>
      {transactionId && (
        <div className="flex gap-6 items-center justify-between">
          <Text color="verySubtle" noWrap>
            Transaction ID
          </Text>
          <ValueCopyable value={transactionId} type="transaction" />
        </div>
      )}
    </div>
  )
}
