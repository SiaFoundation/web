import { Text } from '../../core/Text'
import { ValueSc } from '../../components/ValueSc'
import BigNumber from 'bignumber.js'
import { ValueCopyable } from '../../components/ValueCopyable'
import { SendSiacoinFormData } from './types'
import { getAmountUserWillReceive, getTotalTransactionCost } from './utils'

type Props = SendSiacoinFormData & {
  fee: BigNumber
  transactionId?: string
}

export function WalletSendSiacoinReceipt({
  address,
  hastings,
  fee,
  includeFee,
  transactionId,
}: Props) {
  const amount = getAmountUserWillReceive({
    hastings,
    includeFee,
    fee,
  })
  const total = getTotalTransactionCost({
    hastings,
    includeFee,
    fee,
  })
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Address
        </Text>
        <ValueCopyable testId="address" value={address} type="address" />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Amount
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            testId="amount"
            size="14"
            value={amount}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap>
          Network fee
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            testId="networkFee"
            size="14"
            value={fee}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Text color="verySubtle" noWrap>
          Total
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            testId="total"
            size="14"
            value={total}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      {transactionId && (
        <div className="flex gap-6 items-center justify-between">
          <Text color="verySubtle" noWrap>
            Transaction ID
          </Text>
          <ValueCopyable
            testId="transactionId"
            value={transactionId}
            type="transaction"
          />
        </div>
      )}
    </div>
  )
}
