import {
  Badge,
  ContractTimeline,
  LinkButton,
} from '@siafoundation/design-system'
import { ArrowLeft16, ArrowRight16 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import { ExplorerFileContract } from '@siafoundation/explored-types'

type Props = {
  currentHeight: number
  contract: ExplorerFileContract
  renewedToId?: string
  renewedFromId?: string
}

// This is dummy logic and I'm not even sure it makes sense, given the values.
function contractStatus(valid: boolean, resolved: boolean) {
  return !valid ? 'invalid' : resolved ? 'resolved' : 'unresolved'
}

export async function ContractHeader({
  currentHeight,
  contract,
  renewedFromId,
  renewedToId,
}: Props) {
  const { id } = contract
  return (
    <div className="flex flex-col gap-x-4 gap-y-4 pb-4">
      <div className="flex flex-wrap gap-x-4 gap-y-4 items-center justify-between">
        <EntityHeading
          label="Contract"
          type="contract"
          value={id}
          href={routes.contract.view.replace(':id', id)}
        />
        <div className="flex gap-1">
          {renewedFromId && renewedFromId !== id && (
            <LinkButton
              className="hidden sm:flex"
              variant="gray"
              href={routes.contract.view.replace(':id', renewedFromId)}
            >
              <ArrowLeft16 />
              renewed from
            </LinkButton>
          )}
          <Badge
            interactive={false}
            variant={contract.resolved ? 'green' : 'gray'}
          >
            {contractStatus(contract.valid, contract.resolved)}
          </Badge>
          {renewedToId && renewedToId !== id && (
            <LinkButton
              className="hidden sm:flex"
              href={routes.contract.view.replace(':id', renewedToId)}
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
            contractHeightStart={contract.confirmationIndex.height}
            contractHeightEnd={contract.fileContract.windowStart}
            proofWindowHeightStart={contract.fileContract.windowStart}
            proofWindowHeightEnd={contract.fileContract.windowEnd}
            proofHeight={contract.proofIndex ? contract.proofIndex.height : 0}
            range={{
              startHeight: contract.confirmationIndex.height,
              endHeight: Math.max(
                currentHeight || 0,
                Math.round(
                  contract.fileContract.windowEnd +
                    (contract.fileContract.windowStart -
                      contract.confirmationIndex.height)
                )
              ),
            }}
          />
        </div>
      )}
    </div>
  )
}
