import {
  Text,
  ConfigurationSiacoin,
  Button,
  triggerSuccessToast,
  Separator,
  ConfigurationNumber,
  triggerErrorToast,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useEffect } from 'react'
import { RenterSidenav } from '../../components/RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'
import { useSetting, useSettingsUpdate } from '@siafoundation/react-core'
import { useFormik } from 'formik'
import { useFormChanged } from '../../hooks/useFormChanged'
import { Setting } from '../../components/Setting'
import { MenuSection } from '../../components/MenuSection'

type GougingData = {
  maxStoragePrice: string
  maxDownloadPrice: string
  maxUploadPrice: string
  maxContractPrice: string
  maxRPCPrice: string
}

type RedundancyData = {
  MinShards: number
  TotalShards: number
}

export function Config() {
  const { openDialog } = useDialog()
  const gouging = useSetting({
    params: { key: 'gouging' },
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
  const redundancy = useSetting({
    params: { key: 'redundancy' },
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })

  const settingsUpdate = useSettingsUpdate()

  const form = useFormik({
    initialValues: {
      // gouging
      maxRpcPrice: new BigNumber(0),
      maxStoragePrice: new BigNumber(0),
      maxContractPrice: new BigNumber(0),
      maxDownloadPrice: new BigNumber(0),
      maxUploadPrice: new BigNumber(0),
      // redundancy
      minShards: new BigNumber(0),
      totalShards: new BigNumber(0),
    },
    onSubmit: async (values) => {
      if (!gouging.data || !redundancy.data) {
        return
      }
      try {
        const response = await settingsUpdate.put({
          payload: {
            gouging: JSON.stringify({
              maxRPCPrice: values.maxRpcPrice.toFixed(0).toString(),
              maxStoragePrice: values.maxStoragePrice.toFixed(0).toString(),
              maxContractPrice: values.maxContractPrice.toFixed(0).toString(),
              maxDownloadPrice: values.maxDownloadPrice.toFixed(0).toString(),
              maxUploadPrice: values.maxUploadPrice.toFixed(0).toString(),
            }),
            redundancy: JSON.stringify({
              MinShards: values.minShards.toNumber(),
              TotalShards: values.totalShards.toNumber(),
            }),
          },
        })
        if (response.error) {
          throw Error(response.error)
        }
        triggerSuccessToast('Configuration has been saved.')
        gouging.mutate()
        redundancy.mutate()
      } catch (e) {
        triggerErrorToast((e as Error).message)
      }
    },
  })

  useEffect(() => {
    const func = async () => {
      if (!gouging.data || !redundancy.data) {
        return
      }
      try {
        const gougingData: GougingData = JSON.parse(gouging.data)
        const redundancyData: RedundancyData = JSON.parse(redundancy.data)
        // When new config is fetched, reset the form with the initial values
        await form.resetForm({
          values: {
            // gouging
            maxStoragePrice: new BigNumber(gougingData.maxStoragePrice),
            maxDownloadPrice: new BigNumber(gougingData.maxDownloadPrice),
            maxUploadPrice: new BigNumber(gougingData.maxUploadPrice),
            maxContractPrice: new BigNumber(gougingData.maxContractPrice),
            maxRpcPrice: new BigNumber(gougingData.maxRPCPrice),
            // redundancy
            minShards: new BigNumber(redundancyData.MinShards),
            totalShards: new BigNumber(redundancyData.TotalShards),
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gouging.data, redundancy.data])

  const { changed, changeCount } = useFormChanged(form)

  return (
    <RenterdAuthedLayout
      title="Configuration"
      routes={routes}
      sidenav={<RenterSidenav />}
      actions={
        <div className="flex items-center gap-2">
          {!!changeCount && (
            <Text size="12" color="subtle">
              {changeCount === 1 ? '1 change' : `${changeCount} changes`}
            </Text>
          )}
          <Button
            variant="accent"
            disabled={!changeCount}
            onClick={() => form.submitForm()}
          >
            Save changes
          </Button>
        </div>
      }
      openSettings={() => openDialog('settings')}
    >
      <div className="p-5 flex flex-col gap-16 max-w-screen-xl">
        <MenuSection title="Gouging">
          <Setting
            title="Max storage price"
            description={<>The max allowed price to store one TiB.</>}
            control={
              <ConfigurationSiacoin
                value={form.values.maxStoragePrice}
                changed={changed.maxStoragePrice}
                onChange={(value) =>
                  form.setFieldValue('maxStoragePrice', value)
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max download price"
            description={<>The max allowed price to download one TiB.</>}
            control={
              <ConfigurationSiacoin
                value={form.values.maxDownloadPrice}
                changed={changed.maxDownloadPrice}
                onChange={(value) =>
                  form.setFieldValue('maxDownloadPrice', value)
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max upload price"
            description={<>The max allowed price to upload one TiB.</>}
            control={
              <ConfigurationSiacoin
                value={form.values.maxUploadPrice}
                changed={changed.maxUploadPrice}
                onChange={(value) =>
                  form.setFieldValue('maxUploadPrice', value)
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max contract price"
            description={<>The max allowed price to form a contract.</>}
            control={
              <ConfigurationSiacoin
                value={form.values.maxContractPrice}
                changed={changed.maxContractPrice}
                onChange={(value) =>
                  form.setFieldValue('maxContractPrice', value)
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max RPC price"
            description={<>The max allowed base price for RPCs.</>}
            control={
              <ConfigurationSiacoin
                value={form.values.maxRpcPrice}
                changed={changed.maxRpcPrice}
                onChange={(value) => form.setFieldValue('maxRpcPrice', value)}
              />
            }
          />
        </MenuSection>
        <MenuSection title="Redundancy">
          <Setting
            title="Min shards"
            description={
              <>The minimum amount of shards needed to reconstruct a slab.</>
            }
            control={
              <ConfigurationNumber
                units="shards"
                value={form.values.minShards}
                changed={changed.minShards}
                onChange={(value) => form.setFieldValue('minShards', value)}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Total shards"
            description={<>The total amount of shards for each slab.</>}
            control={
              <ConfigurationNumber
                units="shards"
                value={form.values.totalShards}
                changed={changed.totalShards}
                onChange={(value) => form.setFieldValue('totalShards', value)}
              />
            }
          />
        </MenuSection>
      </div>
    </RenterdAuthedLayout>
  )
}
