'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { humanBytes, humanSiacoin } from '@siafoundation/units'
import { useActiveSiascanExchangeRate } from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { EntityListItemProps } from '../Entity/EntityListItem'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { ContentLayout } from '../ContentLayout'
import { ContractHeader } from './ContractHeader'
import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerV2FileContract,
} from '@siafoundation/explored-types'
import { blockHeightToHumanDate } from '../../lib/time'
import { hastingsToFiat } from '../../lib/currency'
import LoadingCurrency from '../LoadingCurrency'
import LoadingTimestamp from '../LoadingTimestamp'
import { useExploredAddress } from '../../hooks/useExploredAddress'
import { ContractData, contractResolutionLabels } from '../../lib/contracts'

type Props = {
  contractRevisions:
    | ExplorerFileContract[]
    | ExplorerV2FileContract[]
    | undefined
  currentHeight: number
  contract: ContractData
  formationTxnChainIndex: ChainIndex[]
}

export function Contract({
  contractRevisions,
  currentHeight,
  contract,
  formationTxnChainIndex,
}: Props) {
  const api = useExploredAddress()
  const exchange = useActiveSiascanExchangeRate({
    api,
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })
  const values = useMemo(() => {
    return [
      'hostPublicKey' in contract && {
        label: 'host public key',
        entityType: 'hostPublicKey',
        entityValue: contract.hostPublicKey,
      },
      'renterPublicKey' in contract && {
        label: 'renter address',
        entityType: 'address',
        entityValue: contract.renterPayoutValid.address,
        copyable: true,
      },
      {
        label: 'file size',
        copyable: false,
        value: humanBytes(contract.filesize),
      },
      {
        label: 'payout',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            hastingsToFiat(contract.payout, {
              rate: exchange.rate,
              currency: exchange.currency,
            })
          ) : (
            <LoadingCurrency />
          ),
        comment: humanSiacoin(contract.payout),
      },
      {
        label: 'transaction ID',
        entityType: 'transaction',
        entityValue: contract.transactionID,
      },
      {
        label: 'merkle root',
        value: contract.fileMerkleRoot,
      },
      contract.version === 'v1'
        ? {
            label: 'unlock hash',
            value: contract.unlockHash,
          }
        : {
            label: 'resolution type',
            value:
              contractResolutionLabels[
                contract.resolutionType as keyof typeof contractResolutionLabels
              ] ?? '-',
            copyable: false,
          },
      {
        label: 'resolution txn',
        copyable: !!contract.resolutionTransactionID,
        entityType: 'transaction',
        entityValue: contract.resolutionTransactionID || '-',
      },
      {
        label: 'confirmation height',
        copyable: false,
        value: contract.confirmationIndex.height.toLocaleString() || '-',
      },
      {
        label: 'confirmation time',
        copyable: false,
        value: (
          <LoadingTimestamp>
            {blockHeightToHumanDate(
              currentHeight,
              contract.confirmationIndex.height,
            )}
          </LoadingTimestamp>
        ),
      },
      {
        label: 'proof window start',
        copyable: false,
        value: contract.resolutionWindowStart.toLocaleString(),
      },
      {
        label: 'proof window start time',
        copyable: false,
        value: (
          <LoadingTimestamp>
            {blockHeightToHumanDate(
              currentHeight,
              contract.resolutionWindowStart,
            )}
          </LoadingTimestamp>
        ),
      },
      {
        label: 'resolved at',
        copyable: false,
        value: contract.resolutionIndex?.height.toLocaleString() || '-',
      },
      {
        label: 'resolved at time',
        copyable: false,
        value: contract.resolutionIndex ? (
          <LoadingTimestamp>
            {blockHeightToHumanDate(
              currentHeight,
              contract.resolutionIndex.height,
            )}
          </LoadingTimestamp>
        ) : (
          '-'
        ),
      },
      {
        label: 'expiration height',
        copyable: false,
        value: contract.resolutionWindowEnd.toLocaleString(),
      },
      {
        label: 'expiration time',
        copyable: false,
        value: (
          <LoadingTimestamp>
            {blockHeightToHumanDate(
              currentHeight,
              contract.resolutionWindowEnd,
            )}
          </LoadingTimestamp>
        ),
      },
      {
        label: 'payout height',
        copyable: false,
        value: determinePayoutHeight(contract).toLocaleString() || '-',
      },
      {
        label: 'payout time',
        copyable: false,
        value: (
          <LoadingTimestamp>
            {blockHeightToHumanDate(
              currentHeight,
              determinePayoutHeight(contract),
            )}
          </LoadingTimestamp>
        ),
      },
      {
        label: 'revision number',
        value: contract.revisionNumber.toLocaleString(),
      },
      {
        label: 'previous revisions',
        copyable: false,
        value: (contractRevisions && contractRevisions.length > 1
          ? contractRevisions.length - 1
          : 0
        ).toLocaleString(),
      },
    ].filter(Boolean) as DatumProps[]
  }, [
    contract,
    currentHeight,
    exchange.currency,
    exchange.rate,
    contractRevisions,
  ])

  const validProofOutputs = useMemo(() => {
    return [
      {
        label: 'renter payout: remaining renter allowance',
        initials: 'r',
        sc:
          contract.renterPayoutValid &&
          new BigNumber(contract.renterPayoutValid.value),
      },
      {
        label: 'host payout',
        initials: 'h',
        sc:
          contract.hostPayoutValid &&
          new BigNumber(contract.hostPayoutValid.value),
      },
    ] as EntityListItemProps[]
  }, [contract])

  const missedProofOutputs = useMemo(() => {
    return [
      {
        label: 'renter payout: remaining renter allowance',
        initials: 'r',
        sc:
          contract.renterPayoutMissed &&
          new BigNumber(contract.renterPayoutMissed.value),
      },
      {
        label: `host payout: payout minus risked collateral and storage revenue`,
        initials: 'h',
        sc:
          contract.hostPayoutMissed &&
          new BigNumber(contract.hostPayoutMissed.value),
      },
      contract.hostBurned && {
        label: 'host burn: host revenue plus risked collateral',
        initials: 'b',
        sc: contract.hostBurned && new BigNumber(contract.hostBurned.value),
      },
    ].filter(Boolean) as EntityListItemProps[]
  }, [contract])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col">
          <ContractHeader
            currentHeight={currentHeight}
            contract={contract}
            formationTxnChainIndex={formationTxnChainIndex}
          />
          {!!values?.length && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
              {values.map((item) => (
                <ExplorerDatum key={item.label} {...item} />
              ))}
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          <div>
            <EntityList
              title={`Missed proof outputs (${missedProofOutputs.length})`}
              dataset={missedProofOutputs}
            />
          </div>
          <div>
            <EntityList
              title={`Valid proof outputs (${validProofOutputs.length})`}
              dataset={validProofOutputs}
            />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

// The payout height is either the resolution.height + 144, if it exists,
// or the windowEnd + 144.
function determinePayoutHeight(contract: ContractData) {
  return (
    (contract.resolutionIndex?.height || contract.resolutionWindowEnd) + 144
  )
}
