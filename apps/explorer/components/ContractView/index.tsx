import { Container, Separator } from '@siafoundation/design-system'
import { Transaction } from '../Transaction'
import {
  SiaCentralContract,
  SiaCentralExchangeRates,
} from '@siafoundation/sia-central-types'
import { Contract } from '../Contract'
import { ExplorerTransaction } from '@siafoundation/explored-types'
import { TransactionHeaderData } from '../Transaction/TransactionHeader'

type Props = {
  contract: SiaCentralContract
  rates?: SiaCentralExchangeRates
  renewedTo?: SiaCentralContract
  renewedFrom?: SiaCentralContract
  formationTransaction?: ExplorerTransaction
  formationTransactionHeaderData?: TransactionHeaderData
}

export function ContractView({
  contract,
  rates,
  renewedFrom,
  renewedTo,
  formationTransaction,
  formationTransactionHeaderData,
}: Props) {
  return (
    <>
      <Contract
        contract={contract}
        rates={rates}
        renewedFrom={renewedFrom}
        renewedTo={renewedTo}
      />
      <Container>
        <Separator className="w-full my-3" color="verySubtle" />
      </Container>
      {formationTransaction && formationTransactionHeaderData ? (
        <Transaction
          title="Formation"
          transaction={formationTransaction}
          transactionHeaderData={formationTransactionHeaderData}
        />
      ) : null}
    </>
  )
}
