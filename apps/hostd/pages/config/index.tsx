import {
  Button,
  Heading,
  Panel,
  Paragraph,
  Bullhorn16,
  Separator,
  Switch,
  Text,
  TextField,
  ConfigurationSiacoin,
  ConfigurationNumber,
} from '@siafoundation/design-system'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/react-core'
import { toHastings } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { useState } from 'react'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { useDialog } from '../../contexts/dialog'
import { useSettings } from '@siafoundation/react-core'

export default function ConfigPage() {
  const { openDialog } = useDialog()
  const {
    settings: { siaCentral },
  } = useSettings()
  const networkAverages = useSiaCentralHostsNetworkAverages()

  const [ingressPrice, setIngressPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const ingressAverage =
    siaCentral &&
    new BigNumber(
      networkAverages.data?.settings.upload_price || 0
    ).multipliedBy(1e12)

  const [egressPrice, setEgressPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const egressAverage =
    siaCentral &&
    new BigNumber(
      networkAverages.data?.settings.download_price || 0
    ).multipliedBy(1e12)

  const [storagePrice, setStoragePrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const storageAverage =
    siaCentral &&
    new BigNumber(networkAverages.data?.settings.storage_price || 0)
      .multipliedBy(4320)
      .multipliedBy(1e12)

  const [registrySize, setRegistrySize] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  const [registryPath, setRegistryPath] = useState<string | undefined>()

  const [contractPrice, setContractPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const contractAverage =
    siaCentral &&
    new BigNumber(networkAverages.data?.settings.contract_price || 0).dividedBy(
      1e24
    )

  const [maxContractDuration, setMaxContractDuration] = useState<
    BigNumber | undefined
  >(new BigNumber(0))
  const maxContractDuractionAverage =
    siaCentral &&
    new BigNumber(networkAverages.data?.settings.max_duration || 0)
      .dividedBy(24)
      .dividedBy(60)
      .dividedBy(60)

  const [collateralBudget, setCollateralBudget] = useState<
    BigNumber | undefined
  >(new BigNumber(0))

  const [collateral, setCollateral] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const collateralAverage =
    siaCentral &&
    new BigNumber(networkAverages.data?.settings.collateral || 0)
      .multipliedBy(4320)
      .multipliedBy(1e12)

  const collateralSuggestion = new BigNumber(
    collateral.multipliedBy(maxContractDuration)
  )

  const [baseRpcPrice, setBaseRpcPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const baseRpcAverage =
    siaCentral &&
    new BigNumber(networkAverages.data?.settings.base_rpc_price || 0)

  const [sectorAccessPrice, setSectorAccessPrice] = useState<
    BigNumber | undefined
  >(new BigNumber(0))
  const sectorAccessAverage =
    siaCentral &&
    new BigNumber(networkAverages.data?.settings.sector_access_price || 0)

  return (
    <HostdAuthedLayout
      title="Configuration"
      actions={
        <div className="flex flex-wrap gap-4">
          <Switch size="small">Accept contracts</Switch>
          <Button onClick={() => openDialog('hostAnnounce')}>
            <Bullhorn16 />
            Announce
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-14 max-w-screen-xl">
        <Section title="Bandwidth">
          <Setting
            title="Ingress price"
            description={
              <>The amount of Siacoin to upload 1TB of data to the host.</>
            }
            control={
              <ConfigurationSiacoin
                value={ingressPrice}
                average={ingressAverage}
                onChange={setIngressPrice}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Egress price"
            description={
              <>The amount of Siacoin to download 1TB of data from the host.</>
            }
            control={
              <ConfigurationSiacoin
                value={egressPrice}
                average={egressAverage}
                onChange={setEgressPrice}
              />
            }
          />
        </Section>
        <Section title="Registry">
          <Setting
            title="Registry size"
            description={
              <>
                The size of the host registry. The registry is a key value store
                for linking uploaded data to a constant key. Hosts are payed
                much more than the resources actually consumed. Make sure that
                you have enough free space on your disk before allocation the
                registry.
              </>
            }
            control={
              <ConfigurationNumber
                units="GB"
                value={registrySize}
                suggestion={new BigNumber(4)}
                suggestionTip={'4GB is suggested.'}
                onChange={setRegistrySize}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Registry location"
            description={
              <>
                The location of the registry on disk, leave blank for default.
                Defaults to your Sia data path, usually the disk your operating
                system is installed on.
              </>
            }
            control={
              <TextField
                value={registryPath}
                placeholder="/path/to/registry_data"
                onChange={(e) => setRegistryPath(e.target.value)}
                className="w-[220px]"
              />
            }
          />
        </Section>
        <Section title="Storage">
          <Setting
            title="Storage price"
            description={
              <>The amount of Siacoin to store 1TB of data for 1 month.</>
            }
            control={
              <ConfigurationSiacoin
                value={storagePrice}
                average={storageAverage}
                onChange={setStoragePrice}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Contract price"
            description={
              <>
                The amount of Siacoin to form a contract with the host. A
                contract is required to upload, download, and store data. The
                contract fee should only be used to cover expected transaction
                fees.
              </>
            }
            control={
              <ConfigurationSiacoin
                value={contractPrice}
                average={contractAverage}
                suggestion={new BigNumber(toHastings(1))}
                suggestionTip="1 SC or less is suggested as the contract fee should only be used to cover expected transaction fees."
                onChange={setContractPrice}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Collateral"
            description={
              <>
                The amount of Siacoin per 1TB of data stored per month to be
                locked as collateral.
              </>
            }
            control={
              <ConfigurationSiacoin
                value={collateral}
                average={collateralAverage}
                onChange={setCollateral}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Max collateral"
            description={
              <>
                The maximum amount of collateral the host will lock into a
                single contract. This setting also limits the amount of data
                that the renter can store per contract.
              </>
            }
            control={
              <ConfigurationSiacoin
                value={collateral}
                suggestion={collateralSuggestion}
                suggestionTip={
                  'At least collateral per month multiplied by contract duration.'
                }
                onChange={setCollateral}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Collateral budget"
            description={
              <>
                The maximum amount of Siacoin that can be used as collateral. to
                prevent issues with stale contracts, use a very large number or
                multiple times your wallet balance.
              </>
            }
            control={
              <ConfigurationSiacoin
                value={collateralBudget}
                onChange={setCollateralBudget}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Max contract duration"
            description={
              <>
                The maximum amount of time a contract can be created for.
                Payouts only occur at the end of the contract.
              </>
            }
            control={
              <ConfigurationNumber
                units="months"
                value={maxContractDuration}
                average={maxContractDuractionAverage}
                suggestion={new BigNumber(3)}
                suggestionTip={'at least 3 months.'}
                onChange={setMaxContractDuration}
              />
            }
          />
        </Section>
        <Section title="Advanced">
          <Setting
            title="Base RPC price"
            description={
              <>The amount of Siacoin required to interact with the host.</>
            }
            control={
              <ConfigurationSiacoin
                decimalsLimitSc={8}
                decimalsLimitFiat={8}
                value={baseRpcPrice}
                average={baseRpcAverage}
                suggestion={new BigNumber(0)}
                suggestionTip={
                  'Very low or zero since this is charged per interaction.'
                }
                onChange={setBaseRpcPrice}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Sector access price"
            description={
              <>
                The amount of Siacoin required to download or upload a single
                sector from the host.
              </>
            }
            control={
              <ConfigurationSiacoin
                decimalsLimitSc={8}
                decimalsLimitFiat={8}
                value={sectorAccessPrice}
                average={sectorAccessAverage}
                suggestion={new BigNumber(0)}
                suggestionTip={
                  'Very low or zero since this is charged per sector in addition to egress price.'
                }
                onChange={setSectorAccessPrice}
              />
            }
          />
        </Section>
      </div>
    </HostdAuthedLayout>
  )
}

type SettingProps = {
  title: string
  description: React.ReactNode
  suggestion?: React.ReactNode
  control?: React.ReactNode
}

function Setting({ title, description, suggestion, control }: SettingProps) {
  return (
    <div className="flex gap-1 justify-between">
      <div className="flex flex-col gap-2 max-w-[700px]">
        <Text size="20" weight="semibold">
          {title}
        </Text>
        <Paragraph size="14">{description}</Paragraph>
        {suggestion && <Text color="accent">Suggestion: {suggestion}</Text>}
      </div>
      <div className="">{control}</div>
    </div>
  )
}

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <Heading size="24">{title}</Heading>
      <Panel className="p-6">
        <div className="flex flex-col gap-6">{children}</div>
      </Panel>
    </div>
  )
}
