import { Text } from '../../core/Text'
import { Tooltip } from '../../core/Tooltip'
import { ValueSc } from '../../components/ValueSc'
import BigNumber from 'bignumber.js'

type Props = {
  address: string
  siacoin: BigNumber
  fee: BigNumber
  includeFee: boolean
  transactionId?: string
}

export function WalletSendSiacoinReceipt({
  address,
  siacoin,
  fee,
  includeFee,
  transactionId,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle">Address</Text>
        <Tooltip content={address} className="max-w-none">
          <Text font="mono" ellipsis>
            {address}
          </Text>
        </Tooltip>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle">Amount</Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            size="14"
            value={siacoin}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle">Network fee</Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc size="14" value={fee} variant="value" dynamicUnits={false} />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Text color="verySubtle">Total</Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            size="14"
            value={includeFee ? siacoin : siacoin.plus(fee)}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      {transactionId && (
        <div className="flex gap-6 items-center justify-between">
          <Text color="verySubtle">Transaction ID</Text>
          <Tooltip content={transactionId} className="max-w-none">
            <Text font="mono" ellipsis>
              {transactionId}
            </Text>
          </Tooltip>
        </div>
      )}
    </div>
  )
}
