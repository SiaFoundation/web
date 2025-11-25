import {
  HostMap,
  Text,
  ValueCopyable,
  RemoteDataStates,
  ValueWithTooltip,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { UsabilityBadges } from '../UsabilityBadges'
import { StateBadge, StatusBadge } from './contractsColumns'
import { InfoRow } from '../PanelInfoRow'
import { SidePanel } from '../SidePanel'
import { SidePanelSection } from '../SidePanelSection'
import { useContract } from './useContract'
import { useContractsParams } from './useContractsParams'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import { SidePanelSkeleton } from '../SidePanelSkeleton'
import { useHost } from '../Hosts/useHost'
import { countryCodeEmoji } from '@siafoundation/units'

export function SidePanelContract() {
  const { panelId, setPanelId } = useContractsParams()
  const contract = useContract(panelId)
  const host = useHost(contract.data?.contract.hostKey)
  const mapContract = useMemo(() => {
    if (!contract.data?.contract) return null
    return {
      id: contract.data.contract.hostKey,
      publicKey: contract.data.contract.hostKey,
      location: host.data?.location,
      usable: contract.data.contract.good,
    }
  }, [contract, host])
  if (!contract) {
    return (
      <SidePanel heading={null}>
        <div className="flex justify-center pt-[50px]">
          <Text color="subtle">Contract not found</Text>
        </div>
      </SidePanel>
    )
  }
  return (
    <RemoteDataStates
      data={contract}
      loading={
        <SidePanelSkeleton
          withMap
          withActions={false}
          onClose={() => setPanelId(undefined)}
        />
      }
      notFound={
        <SidePanel heading={null}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Contract not found</Text>
          </div>
        </SidePanel>
      }
      loaded={({ contract, host }) => (
        <SidePanel
          onClose={() => setPanelId(undefined)}
          heading={
            <SidePanelHeadingCopyable
              heading="Contract"
              value={contract?.id}
              label="contract"
            />
          }
        >
          <HostMap
            hosts={mapContract ? [mapContract] : []}
            activeHost={mapContract}
            onHostMapClick={() => null}
            scale={180}
            mapClassName="-mt-[20px]"
          />
          <SidePanelSection heading="Info">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="State"
                value={<StateBadge value={contract.state} />}
              />
              <InfoRow
                label="Status"
                value={<StatusBadge variant={contract.good ? 'good' : 'bad'} />}
              />
              <InfoRow
                label="Host Country"
                value={
                  host.location.countryCode === 'unknown'
                    ? null
                    : `${countryCodeEmoji(host.location.countryCode)} ${host.location.countryCode}`
                }
              />
              <InfoRow
                label="Host public key"
                value={
                  <ValueCopyable
                    value={contract.hostKey}
                    type="hostPublicKey"
                  />
                }
              />
              {host.addresses?.map((address) => (
                <InfoRow
                  key={address.address + address.protocol}
                  label={address.protocol}
                  value={
                    <ValueCopyable value={address.address} maxLength={24} />
                  }
                />
              ))}
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Usability">
            <UsabilityBadges
              usable={host?.usable || false}
              usability={host?.usability}
              className="w-full overflow-hidden flex-wrap"
            />
          </SidePanelSection>
          <SidePanelSection heading="Storage">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Capacity"
                value={contract.displayFields.capacity}
              />
              <InfoRow
                label="Data Size"
                value={contract.displayFields.dataSize}
              />
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Allowance">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Initial Allowance"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.initialAllowance}
                  />
                }
              />
              <InfoRow
                label="Remaining Allowance"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.remainingAllowance}
                  />
                }
              />
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Collateral">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Total Collateral"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.totalCollateral}
                  />
                }
              />
              <InfoRow
                label="Used Collateral"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.usedCollateral}
                  />
                }
              />
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Lifecycle">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Formation"
                value={contract.displayFields.formation}
              />
              <InfoRow
                label="Expiration Height"
                value={contract.displayFields.expirationHeight}
              />
              <InfoRow
                label="Proof Height"
                value={contract.displayFields.proofHeight}
              />
              <InfoRow
                label="Next Prune"
                value={contract.displayFields.nextPrune}
              />
              <InfoRow
                label="Last Broadcast Attempt"
                value={contract.displayFields.lastBroadcastAttempt}
              />
              <InfoRow
                label="Renewed From"
                value={
                  contract.displayFields.renewedFrom && (
                    <ValueCopyable
                      value={contract.displayFields.renewedFrom}
                      type="contract"
                    />
                  )
                }
              />
              <InfoRow
                label="Renewed To"
                value={
                  contract.displayFields.renewedTo && (
                    <ValueCopyable
                      value={contract.displayFields.renewedTo}
                      type="contract"
                    />
                  )
                }
              />
              <InfoRow
                label="Revision Number"
                value={contract.displayFields.revisionNumber}
              />
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Spending">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Contract Price"
                value={
                  <ValueWithTooltip {...contract.displayFields.contractPrice} />
                }
              />
              <InfoRow
                label="Miner Fee"
                value={
                  <ValueWithTooltip {...contract.displayFields.minerFee} />
                }
              />
              <InfoRow
                label="Spend Sector Roots"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.spendSectorRoots}
                  />
                }
              />
              <InfoRow
                label="Spend Append Sector"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.spendAppendSector}
                  />
                }
              />
              <InfoRow
                label="Spend Free Sector"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.spendFreeSector}
                  />
                }
              />
              <InfoRow
                label="Spend Fund Account"
                value={
                  <ValueWithTooltip
                    {...contract.displayFields.spendFundAccount}
                  />
                }
              />
            </div>
          </SidePanelSection>
        </SidePanel>
      )}
    />
  )
}
