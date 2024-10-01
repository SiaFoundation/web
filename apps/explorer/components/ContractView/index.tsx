import { Container, Separator } from '@siafoundation/design-system'
import { Transaction } from '../Transaction'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import { Contract } from '../Contract'
import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerTransaction,
  FileContractID,
} from '@siafoundation/explored-types'
import { TransactionHeaderData } from '../Transaction/TransactionHeader'

type Props = {
  previousRevisions: ExplorerFileContract[] | undefined
  currentHeight: number
  contract: ExplorerFileContract
  rates?: SiaCentralExchangeRates
  renewedToID: FileContractID | null
  renewedFromID: FileContractID | null
  formationTransaction?: ExplorerTransaction
  formationTxnChainIndex: ChainIndex[]
  formationTransactionHeaderData?: TransactionHeaderData
}

export function ContractView({
  previousRevisions,
  currentHeight,
  contract,
  rates,
  renewedFromID,
  renewedToID,
  formationTransaction,
  formationTxnChainIndex,
  formationTransactionHeaderData,
}: Props) {
  return (
    <>
      <Contract
        previousRevisions={previousRevisions}
        currentHeight={currentHeight}
        contract={contract}
        rates={rates}
        renewedFromID={renewedFromID}
        renewedToID={renewedToID}
        formationTxnChainIndex={formationTxnChainIndex}
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
