import { Container, Separator } from '@siafoundation/design-system'
import { Transaction } from '../Transaction'
import { Contract } from '../Contract'
import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerTransaction,
  ExplorerV2FileContract,
  ExplorerV2Transaction,
  // FileContractID,
} from '@siafoundation/explored-types'
import { TransactionHeaderData } from '../Transaction/TransactionHeader'
import { ContractData } from '../../lib/contracts'

type Props = {
  contractRevisions:
    | ExplorerFileContract[]
    | ExplorerV2FileContract[]
    | undefined
  currentHeight: number
  contract: ContractData
  // renewedToID: FileContractID | null
  // renewedFromID: FileContractID | null
  formationTransaction?: ExplorerTransaction | ExplorerV2Transaction
  formationTxnChainIndex: ChainIndex[]
  formationTransactionHeaderData?: TransactionHeaderData
}

export function ContractView({
  contractRevisions,
  currentHeight,
  contract,
  // renewedFromID,
  // renewedToID,
  formationTransaction,
  formationTxnChainIndex,
  formationTransactionHeaderData,
}: Props) {
  return (
    <>
      <Contract
        contractRevisions={contractRevisions}
        currentHeight={currentHeight}
        contract={contract}
        // renewedFromID={renewedFromID}
        // renewedToID={renewedToID}
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
