import {
  Box,
  Button,
  Flex,
  Heading,
  Panel,
  Paragraph,
  Separator,
  Switch,
  Text,
  TextField,
} from '@siafoundation/design-system'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/react-core'
import { toHastings } from '@siafoundation/sia-js'
import { ConfigurationSiacoin } from '../../components/ConfigurationSiacoin'
import BigNumber from 'bignumber.js'
import { useState } from 'react'
import { AuthedLayout } from '../../components/AuthedLayout'
import { useDialog } from '../../contexts/dialog'
import { ConfigurationNumber } from '../../components/ConfigurationNumber'

export default function ConfigPage() {
  const { openDialog } = useDialog()
  const networkAverages = useSiaCentralHostsNetworkAverages()

  const [ingressPrice, setIngressPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const ingressAverage = new BigNumber(
    networkAverages.data?.settings.upload_price
  ).multipliedBy(1e12)

  const [egressPrice, setEgressPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const egressAverage = new BigNumber(
    networkAverages.data?.settings.download_price
  ).multipliedBy(1e12)

  const [storagePrice, setStoragePrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const storageAverage = new BigNumber(
    networkAverages.data?.settings.storage_price
  )
    .multipliedBy(4320)
    .multipliedBy(1e12)

  const [registrySize, setRegistrySize] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  const [registryPath, setRegistryPath] = useState<string | undefined>()

  const [contractPrice, setContractPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const contractAverage = new BigNumber(
    networkAverages.data?.settings.contract_price
  ).dividedBy(1e24)

  const [maxContractDuration, setMaxContractDuration] = useState<
    BigNumber | undefined
  >(new BigNumber(0))
  const maxContractDuractionAverage = new BigNumber(
    networkAverages.data?.settings.max_duration
  )
    .dividedBy(24)
    .dividedBy(60)
    .dividedBy(60)

  const [collateralBudget, setCollateralBudget] = useState<
    BigNumber | undefined
  >(new BigNumber(0))

  const [collateral, setCollateral] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const collateralAverage = new BigNumber(
    networkAverages.data?.settings.collateral
  )
    .multipliedBy(4320)
    .multipliedBy(1e12)

  const collateralSuggestion = new BigNumber(
    collateral.multipliedBy(maxContractDuration)
  )

  const [baseRpcPrice, setBaseRpcPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const baseRpcAverage = new BigNumber(
    networkAverages.data?.settings.base_rpc_price
  )

  const [sectorAccessPrice, setSectorAccessPrice] = useState<
    BigNumber | undefined
  >(new BigNumber(0))
  const sectorAccessAverage = new BigNumber(
    networkAverages.data?.settings.sector_access_price
  )

  return (
    <AuthedLayout
      title="Configuration"
      actions={
        <Flex gap="2" wrap="wrap">
          <Switch size="1">Accepting contracts</Switch>
          <Button onClick={() => openDialog('hostAnnounce')}>Announce</Button>
        </Flex>
      }
    >
      <Flex gap="7" direction="column" css={{ maxWidth: '1200px' }}>
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
          <Separator size="100" />
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
          <Separator size="100" />
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
                css={{ width: '220px' }}
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
          <Separator size="100" />
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
          <Separator size="100" />
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
          <Separator size="100" />
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
          <Separator size="100" />
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
          <Separator size="100" />
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
          <Separator size="100" />
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
      </Flex>
    </AuthedLayout>
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
    <Flex justify="between">
      <Flex gap="1" direction="column" css={{ maxWidth: '700px' }}>
        <Text size="20" weight="semibold">
          {title}
        </Text>
        <Paragraph size="14">{description}</Paragraph>
        {suggestion && <Text color="accent">Suggestion: {suggestion}</Text>}
      </Flex>
      <Box>{control}</Box>
    </Flex>
  )
}

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <Flex gap="3" direction="column">
      <Heading size="24">{title}</Heading>
      <Panel css={{ p: '$3' }}>
        <Flex gap="3" direction="column">
          {children}
        </Flex>
      </Panel>
    </Flex>
  )
}
