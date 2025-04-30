import { Container, Separator } from '@siafoundation/design-system'
import { Transaction } from '../Transaction'
import { Contract } from '../Contract'
import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerTransaction,
  ExplorerV2FileContract,
  ExplorerV2Transaction,
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
  formationTransaction?: ExplorerTransaction | ExplorerV2Transaction
  formationTxnChainIndex: ChainIndex[]
  formationTransactionHeaderData?: TransactionHeaderData
}

export function ContractView({
  contractRevisions,
  currentHeight,
  contract,
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
