import {
  Text,
  ValueSc,
  ValueCopyable,
  ValueSf,
} from '@siafoundation/design-system'
import { SendParamsV1 } from './typesV1'

type Props = {
  params: SendParamsV1
  transactionId?: string
}

export function SendReceiptV1({
  params: {
    receiveAddress,
    changeAddress,
    claimAddress,
    mode,
    siacoin,
    siafund,
    fee,
  },
  transactionId,
}: Props) {
  const totalSiacoin = siacoin.plus(fee)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle" noWrap id="recipientAddress">
          Recipient address
        </Text>
        <ValueCopyable
          value={receiveAddress}
          type="address"
          labeledBy="recipientAddress"
        />
      </div>
      <div className="flex gap-6 justify-between items-center">
        <Text color="verySubtle" noWrap id="changeAddress">
          Change address
        </Text>
        <ValueCopyable
          value={changeAddress}
          type="address"
          labeledBy="changeAddress"
        />
      </div>
      {mode === 'siafund' && (
        <div className="flex gap-6 justify-between items-center">
          <Text color="verySubtle" noWrap id="claimAddress">
            Claim address
          </Text>
          <ValueCopyable
            value={claimAddress}
            type="address"
            labeledBy="claimAddress"
          />
        </div>
      )}
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap id="amount">
          Amount
        </Text>
        <div className="flex relative top-[-0.5px]">
          {mode === 'siacoin' ? (
            <ValueSc
              labeledBy="amount"
              size="14"
              value={siacoin}
              variant="value"
              dynamicUnits={false}
            />
          ) : (
            <ValueSf
              labeledBy="amount"
              size="14"
              value={siafund}
              variant="value"
            />
          )}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Text color="verySubtle" noWrap id="networkFee">
          Network fee
        </Text>
        <div className="flex relative top-[-0.5px]">
          <ValueSc
            labeledBy="networkFee"
            size="14"
            value={fee}
            variant="value"
            dynamicUnits={false}
          />
        </div>
      </div>
      {mode === 'siacoin' && (
        <div className="flex items-center gap-2 justify-between">
          <Text color="verySubtle" noWrap id="total">
            Total
          </Text>
          <div className="flex relative top-[-0.5px]">
            <ValueSc
              labeledBy="total"
              size="14"
              value={totalSiacoin}
              variant="value"
              dynamicUnits={false}
            />
          </div>
        </div>
      )}
      {transactionId && (
        <div className="flex gap-6 items-center justify-between">
          <Text color="verySubtle" noWrap id="transactionId">
            Transaction ID
          </Text>
          <ValueCopyable
            value={transactionId}
            type="transaction"
            labeledBy="transactionId"
          />
        </div>
      )}
    </div>
  )
}
