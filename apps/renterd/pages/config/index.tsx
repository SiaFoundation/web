import {
  Heading,
  Panel,
  Paragraph,
  Separator,
  Text,
  ConfigurationSiacoin,
  ConfigurationNumber,
  Button,
  triggerSuccessToast,
  monthsToBlocks,
  blocksToMonths,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { RenterSidenav } from '../../components/RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'
import {
  useAutopilotConfig,
  useAutopilotConfigUpdate,
  useSetting,
} from '@siafoundation/react-core'
import { useFormik } from 'formik'

export default function ConfigPage() {
  const { openDialog } = useDialog()
  const gouging = useSetting({ key: 'gouging' })
  const redundancy = useSetting({ key: 'redundancy' })
  const configUpdate = useAutopilotConfigUpdate()
  const config = useAutopilotConfig({
    revalidateOnFocus: false,
  })

  console.log(config.data, gouging.data, redundancy.data)

  const formik = useFormik({
    initialValues: {
      allowance: new BigNumber(0),
      period: new BigNumber(3),
      hosts: new BigNumber(50),
      renewWindow: new BigNumber(3),
      download: new BigNumber(0),
      upload: new BigNumber(0),
      storage: new BigNumber(0),
    },
    onSubmit: async (values, actions) => {
      if (!config.data) {
        return
      }
      try {
        await configUpdate.put({
          payload: {
            contracts: {
              allowance: values.allowance.toString(),
              hosts: values.hosts.toNumber(),
              period: monthsToBlocks(values.period.toNumber()),
              renewWindow: monthsToBlocks(values.renewWindow.toNumber()),
              download: values.download.toNumber(),
              upload: values.upload.toNumber(),
              storage: values.storage.toNumber(),
            },
            hosts: config.data.hosts,
            wallet: config.data.wallet,
          },
        })
        triggerSuccessToast('Configuration has been saved.')
        console.log('success')
        config.mutate()
      } catch (e) {
        formik.setErrors(e)
      }
    },
  })

  const [targetPrice, setTargetPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  const [allowanceSuggestion, setAllowanceSuggestion] = useState<BigNumber>(
    new BigNumber(0)
  )

  useEffect(() => {
    const func = async () => {
      if (!config.data) {
        return
      }
      const allowance = new BigNumber(config.data?.contracts.allowance)
      const hosts = new BigNumber(config.data?.contracts.hosts)
      const period = new BigNumber(
        blocksToMonths(config.data?.contracts.period)
      )
      const renewWindow = new BigNumber(
        blocksToMonths(config.data?.contracts.renewWindow)
      )
      const download = new BigNumber(config.data?.contracts.download)
      const upload = new BigNumber(config.data?.contracts.upload)
      const storage = new BigNumber(config.data?.contracts.storage)
      try {
        await formik.resetForm({
          values: {
            allowance,
            hosts,
            period,
            renewWindow,
            download,
            upload,
            storage,
          },
        })
      } catch (e) {
        console.log(e)
      }

      if (storage.isZero() || period.isZero()) {
        return
      }

      setTargetPrice(allowance.div(storage.times(period)))
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.data])

  useEffect(() => {
    setAllowanceSuggestion(
      formik.values.storage.times(targetPrice).times(formik.values.period)
    )
  }, [formik.values.storage, formik.values.period, targetPrice])

  return (
    <RenterdAuthedLayout
      title="Configuration"
      routes={routes}
      sidenav={<RenterSidenav />}
      actions={<Button onClick={() => formik.submitForm()}>Save</Button>}
      openSettings={() => openDialog('settings')}
    >
      <div className="flex flex-col gap-16 max-w-screen-xl">
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
          <Separator className="w-full" />
          <Setting
            title="Expected storage"
            description={
              <>The amount of storage you would like to rent in TB.</>
            }
            control={
              <ConfigurationNumber
                units="TB"
                value={formik.values.storage}
                onChange={(value) => formik.setFieldValue('storage', value)}
              />
            }
          />
          <Separator className="w-full" />
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
                value={formik.values.upload}
                onChange={(value) => formik.setFieldValue('upload', value)}
              />
            }
          />
          <Separator className="w-full" />
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
                value={formik.values.download}
                onChange={(value) => formik.setFieldValue('download', value)}
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
                value={formik.values.allowance}
                onChange={(value) => formik.setFieldValue('allowance', value)}
                suggestion={allowanceSuggestion}
                suggestionTip={
                  'Suggested allowance based on your target price, expected usage, and period.'
                }
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Period"
            description={<>The length of the storage contracts.</>}
            control={
              <ConfigurationNumber
                units="months"
                value={formik.values.period}
                onChange={(value) => formik.setFieldValue('period', value)}
                suggestion={new BigNumber(3)}
                suggestionTip={'Typically 3 months.'}
              />
            }
          />
          <Separator className="w-full" />
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
                value={formik.values.renewWindow}
                onChange={(value) => formik.setFieldValue('renewWindow', value)}
                suggestion={new BigNumber(1)}
                suggestionTip={'Typically 1 month.'}
              />
            }
          />
          <Separator className="w-full" />
          <Setting
            title="Hosts"
            description={<>The number of hosts to create contracts with.</>}
            control={
              <ConfigurationNumber
                units="hosts"
                value={formik.values.hosts}
                onChange={(value) => formik.setFieldValue('hosts', value)}
                suggestion={new BigNumber(50)}
                suggestionTip={'Typically 50 hosts.'}
              />
            }
          />
        </Section>
      </div>
    </RenterdAuthedLayout>
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
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 max-w-screen-md">
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
