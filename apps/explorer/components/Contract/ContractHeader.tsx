import {
  Badge,
  ContractTimeline,
  LinkButton,
  stripPrefix,
} from '@siafoundation/design-system'
import { ArrowLeft16, ArrowRight16 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import { ChainIndex, ExplorerFileContract } from '@siafoundation/explored-types'
import { determineContractStatus } from '../../lib/contracts'

type Props = {
  currentHeight: number
  contract: ExplorerFileContract
  renewedToID: string | null
  renewedFromID: string | null
  formationTxnChainIndex: ChainIndex[]
}

export function ContractHeader({
  currentHeight,
  contract,
  renewedFromID,
  renewedToID,
  formationTxnChainIndex,
}: Props) {
  const { id } = contract
  const contractStatus = determineContractStatus(contract)
  return (
    <div className="flex flex-col gap-x-4 gap-y-4 pb-4">
      <div className="flex flex-wrap gap-x-4 gap-y-4 items-center justify-between">
        <EntityHeading
          label="Contract"
          type="contract"
          value={stripPrefix(id)}
          href={routes.contract.view.replace(':id', id)}
        />
        <div className="flex gap-1">
          {renewedFromID && renewedFromID !== stripPrefix(id) && (
            <LinkButton
              className="hidden sm:flex"
              variant="gray"
              href={routes.contract.view.replace(':id', renewedFromID)}
              data-testid="explorer-contract-renewedFrom"
            >
              <ArrowLeft16 />
              renewed from
            </LinkButton>
          )}
          <Badge
            interactive={false}
            variant={
              contractStatus === 'in progress'
                ? 'gray'
                : contractStatus === 'obligation succeeded'
                ? 'green'
                : 'red'
            }
          >
            {contractStatus}
          </Badge>
          {renewedToID && renewedToID !== stripPrefix(id) && (
            <LinkButton
              className="hidden sm:flex"
              href={routes.contract.view.replace(':id', renewedToID)}
              data-testid="explorer-contract-renewedTo"
            >
              renewed to
              <ArrowRight16 />
            </LinkButton>
          )}
        </div>
      </div>
      {currentHeight && (
        <div className="px-1">
          <ContractTimeline
            currentHeight={currentHeight || 0}
            contractHeightStart={
              contract.confirmationIndex?.height ||
              formationTxnChainIndex[0].height
            }
            contractHeightEnd={contract.windowStart}
            proofWindowHeightStart={contract.windowStart}
            proofWindowHeightEnd={contract.windowEnd}
            resolutionHeight={
              contract.proofIndex ? contract.proofIndex.height : 0
            }
            range={{
              startHeight:
                contract.confirmationIndex?.height ||
                formationTxnChainIndex[0].height,
              endHeight: Math.max(
                currentHeight || 0,
                Math.round(
                  contract.windowEnd +
                    (contract.windowStart -
                      (contract.confirmationIndex?.height ||
                        formationTxnChainIndex[0].height))
                )
              ),
            }}
          />
        </div>
      )}
    </div>
  )
}
