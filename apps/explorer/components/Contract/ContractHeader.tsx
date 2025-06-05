import {
  Badge,
  ContractTimeline,
  LinkButton,
  stripPrefix,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { ArrowLeft16, ArrowRight16 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import { ChainIndex } from '@siafoundation/explored-types'
import { ContractData, determineContractStatusColor } from '../../lib/contracts'

type Props = {
  currentHeight: number
  contract: ContractData
  formationTxnChainIndex: ChainIndex[]
}

export function ContractHeader({
  currentHeight,
  contract,
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
        <div className="flex gap-2 items-center">
          {contract.renewedFromContractID && (
            <LinkButton
              variant="active"
              href={routes.contract.view.replace(
                ':id',
                contract.renewedFromContractID
              )}
              data-testid="explorer-contract-renewedFrom"
            >
              <ArrowLeft16 /> <Text color="subtle">renewed from</Text>
            </LinkButton>
          )}
          {contract.renewedToContractID && (
            <LinkButton
              variant="active"
              href={routes.contract.view.replace(
                ':id',
                contract.renewedToContractID
              )}
              data-testid="explorer-contract-renewedTo"
            >
              <Text color="subtle">renewed to</Text> <ArrowRight16 />
            </LinkButton>
          )}
          <Badge
            interactive={false}
            variant={determineContractStatusColor(contract.status)}
          >
            {contract.status}
          </Badge>
          <Tooltip content={'contract version'}>
            <Badge variant="simple" data-testid="explorer-contract-version">
              {contract.version}
            </Badge>
          </Tooltip>
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
