import {
  Badge,
  ContractTimeline,
  // LinkButton,
  stripPrefix,
} from '@siafoundation/design-system'
// import { ArrowLeft16, ArrowRight16 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import { ChainIndex } from '@siafoundation/explored-types'
import { ContractData, determineContractStatusColor } from '../../lib/contracts'

type Props = {
  currentHeight: number
  contract: ContractData
  // renewedToID: string | null
  // renewedFromID: string | null
  formationTxnChainIndex: ChainIndex[]
}

export function ContractHeader({
  currentHeight,
  contract,
  // renewedFromID,
  // renewedToID,
  formationTxnChainIndex,
}: Props) {
  const { id } = contract
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
          {/* {renewedFromID && renewedFromID !== stripPrefix(id) && (
            <LinkButton
              className="hidden sm:flex"
              variant="gray"
              href={routes.contract.view.replace(':id', renewedFromID)}
              data-testid="explorer-contract-renewedFrom"
            >
              <ArrowLeft16 />
              renewed from
            </LinkButton>
          )} */}
          <Badge
            interactive={false}
            variant={determineContractStatusColor(contract.status)}
          >
            {contract.status}
          </Badge>
          {/* {renewedToID && renewedToID !== stripPrefix(id) && (
            <LinkButton
              className="hidden sm:flex"
              href={routes.contract.view.replace(':id', renewedToID)}
              data-testid="explorer-contract-renewedTo"
            >
              renewed to
              <ArrowRight16 />
            </LinkButton>
          )} */}
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
            contractHeightEnd={contract.resolutionWindowStart}
            proofWindowHeightStart={contract.resolutionWindowStart}
            proofWindowHeightEnd={contract.resolutionWindowEnd}
            resolutionHeight={contract.resolutionIndex?.height || 0}
            range={{
              startHeight:
                contract.confirmationIndex?.height ||
                formationTxnChainIndex[0].height,
              endHeight: Math.max(
                currentHeight || 0,
                Math.round(
                  contract.resolutionWindowEnd +
                    (contract.resolutionWindowStart -
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
