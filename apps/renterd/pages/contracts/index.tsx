import { ContractsProvider } from '../../contexts/contracts'
import { Contracts } from '../../components/Contracts'

export default function ContractsPage() {
  return (
    <ContractsProvider>
      <Contracts />
    </ContractsProvider>
  )
}
