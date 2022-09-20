import {
  Box,
  Flex,
  Heading,
  Panel,
  Paragraph,
  Separator,
  Text,
  ConfigurationSiacoin,
  ConfigurationNumber,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { AppAuthedLayout } from '@siafoundation/design-system'
import { RenterSidenav } from '../../components/RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'

export default function ConfigPage() {
  const { openDialog } = useDialog()

  const [targetPrice, setTargetPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  const [allowance, setAllowance] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )
  const [allowanceSuggestion, setAllowanceSuggestion] = useState<BigNumber>(
    new BigNumber(0)
  )

  const [expectedStorage, setExpectedStorage] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  const [period, setPeriod] = useState<BigNumber | undefined>(new BigNumber(3))

  const [hosts, setHosts] = useState<BigNumber | undefined>(new BigNumber(50))

  const [renewWindow, setRenewWindow] = useState<BigNumber | undefined>(
    new BigNumber(3)
  )

  const [expectedDownload, setExpectedDownload] = useState<
    BigNumber | undefined
  >(new BigNumber(0))
  const [expectedUpload, setExpectedUpload] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  useEffect(() => {
    setAllowanceSuggestion(expectedStorage.times(targetPrice).times(period))
  }, [targetPrice, expectedStorage, period])

  return (
    <AppAuthedLayout
      title="Configuration"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
    >
      <Flex gap="7" direction="column" css={{ maxWidth: '1200px' }}>
        <Section title="Basic">
          <Setting
            title="Target price"
            description={
              <>The amount of Siacoin to upload 1 TB of data to the host.</>
            }
            control={
              <ConfigurationSiacoin
                value={targetPrice}
                onChange={setTargetPrice}
              />
            }
          />
          <Separator size="100" />
          <Setting
            title="Expected storage"
            description={
              <>The amount of storage you would like to rent in TB.</>
            }
            control={
              <ConfigurationNumber
                units="TB"
                value={expectedStorage}
                onChange={setExpectedStorage}
              />
            }
          />
          <Separator size="100" />
          <Setting
            title="Expected upload"
            description={
              <>
                The amount of upload bandwidth you plan to use each month in TB.
              </>
            }
            control={
              <ConfigurationNumber
                units="TB"
                value={expectedUpload}
                onChange={setExpectedUpload}
              />
            }
          />
          <Separator size="100" />
          <Setting
            title="Expected download"
            description={
              <>
                The amount of download bandwidth you plan to use each month in
                TB.
              </>
            }
            control={
              <ConfigurationNumber
                units="TB"
                value={expectedDownload}
                onChange={setExpectedDownload}
              />
            }
          />
        </Section>
        <Section title="Advanced">
          <Setting
            title="Allowance"
            description={
              <>The amount of Siacoin you would like to spend for the period.</>
            }
            control={
              <ConfigurationSiacoin
                value={allowance}
                onChange={setAllowance}
                suggestion={allowanceSuggestion}
                suggestionTip={
                  'Suggested allowance based on your target price, expected usage, and period.'
                }
              />
            }
          />
          <Separator size="100" />
          <Setting
            title="Period"
            description={<>The length of the storage contracts.</>}
            control={
              <ConfigurationNumber
                units="months"
                value={period}
                suggestion={new BigNumber(3)}
                suggestionTip={'Typically 3 months.'}
                onChange={setPeriod}
              />
            }
          />
          <Separator size="100" />
          <Setting
            title="Renew window"
            description={
              <>
                The number of months prior to contract expiration that Sia will
                attempt to renew your contracts.
              </>
            }
            control={
              <ConfigurationNumber
                units="months"
                value={renewWindow}
                suggestion={new BigNumber(1)}
                suggestionTip={'Typically 1 month.'}
                onChange={setRenewWindow}
              />
            }
          />
          <Separator size="100" />
          <Setting
            title="Hosts"
            description={<>The number of hosts to create contracts with.</>}
            control={
              <ConfigurationNumber
                units="hosts"
                value={hosts}
                suggestion={new BigNumber(50)}
                suggestionTip={'Typically 50 hosts.'}
                onChange={setHosts}
              />
            }
          />
        </Section>
      </Flex>
    </AppAuthedLayout>
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
