import {
  Badge,
  ContractTimeline,
  LinkButton,
} from '@siafoundation/design-system'
import { ArrowLeft16, ArrowRight16 } from '@siafoundation/react-icons'
import { SiaCentralContract } from '@siafoundation/sia-central-types'
import { lowerCase } from '@technically/lodash'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import { siaCentral } from '../../config/siaCentral'
import { to } from '@siafoundation/request'

type Props = {
  contract: SiaCentralContract
  renewedToId?: string
  renewedFromId?: string
}

export async function ContractHeader({
  contract,
  renewedFromId,
  renewedToId,
}: Props) {
  const { id } = contract
  const [latest, error] = await to(siaCentral.blockLatest())
  if (error) {
    console.error(error.stack)
  }
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
            variant={
              contract.status === 'obligationSucceeded' ? 'green' : 'gray'
            }
          >
            {lowerCase(contract.status)}
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
      {latest?.block && (
        <div className="px-1">
          <ContractTimeline
            currentHeight={latest.block.height || 0}
            contractHeightStart={contract.negotiation_height}
            contractHeightEnd={contract.expiration_height}
            proofWindowHeightStart={contract.expiration_height}
            proofWindowHeightEnd={contract.proof_deadline}
            proofHeight={contract.proof_height}
            range={{
              startHeight: contract.negotiation_height,
              endHeight: Math.max(
                latest.block.height || 0,
                Math.round(
                  contract.proof_deadline +
                    (contract.expiration_height - contract.negotiation_height)
                )
              ),
            }}
          />
        </div>
      )}
    </div>
  )
}
