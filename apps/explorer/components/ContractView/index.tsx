import { Container, Separator } from '@siafoundation/design-system'
import { Transaction } from '../Transaction'
import {
  SiaCentralContract,
  SiaCentralExchangeRates,
  SiaCentralTransaction,
} from '@siafoundation/sia-central'
import { Contract } from '../Contract'

type Props = {
  contract: SiaCentralContract
  rates?: SiaCentralExchangeRates
  renewedTo?: SiaCentralContract
  renewedFrom?: SiaCentralContract
  formationTransaction?: SiaCentralTransaction
}

export function ContractView({
  contract,
  rates,
  renewedFrom,
  renewedTo,
  formationTransaction,
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
      {formationTransaction ? (
        <Transaction title="Formation" transaction={formationTransaction} />
      ) : null}
    </>
  )
}
