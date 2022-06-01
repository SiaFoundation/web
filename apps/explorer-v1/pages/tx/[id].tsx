import { useEntity } from '../../hooks/useEntity'
import { useRouter } from 'next/router'
import { ScTxEntity } from '../../components/entities/ScTxEntity'
import { ContractForEntity } from '../../components/entities/ContractForEntity'
import { ContractResEntity } from '../../components/entities/ContractResEntity'
import { ContractRevEntity } from '../../components/entities/ContractRevEntity'
import { StorageProofEntity } from '../../components/entities/StorageProofEntity'
import { CollateralPostEntity } from '../../components/entities/CollateralPostEntity'
import { AllowancePostEntity } from '../../components/entities/AllowancePostEntity'
import { HostAnnEntity } from '../../components/entities/HostAnnEntity'
import { BlockRewardEntity } from '../../components/entities/BlockRewardEntity'
import { SfTxEntity } from '../../components/entities/SfTxEntity'
import { TxEntitySkeleton } from '../../components/entities/TxEntitySkeleton'
import { TxEntity404 } from '../../components/entities/TxEntity404'
import { routes } from '../../config/routes'
import { getHrefForType } from '../../lib/utils'

const typeToComponent = {
  contract: ContractForEntity,
  contractresol: ContractResEntity,
  revision: ContractRevEntity,
  storageproof: StorageProofEntity,
  collateralPost: CollateralPostEntity,
  allowancePost: AllowancePostEntity,
  'host ann': HostAnnEntity,
  blockreward: BlockRewardEntity,
  ScTx: ScTxEntity,
  SfTx: SfTxEntity,
}

export default function ViewTx() {
  const router = useRouter()
  const tx = useEntity(router.query.id as string)

  // Sometimes things in transaction list like 'allowancePost' actually point to an address,
  // to silenty recover from the error we can redirect to the correct entity view.
  // All non tx entity types will return a route, otherwise this will be undefined.
  const nonTxRoute = routes[tx.data?.type]
  if (nonTxRoute) {
    const href = getHrefForType(tx.data?.type, router.query.id as string)
    router.replace(href)
  }

  if (tx.data) {
    const EntityComponent = typeToComponent[tx.data?.type] || TxEntity404

    return <EntityComponent entity={tx.data} />
  }

  return <TxEntitySkeleton />
}
