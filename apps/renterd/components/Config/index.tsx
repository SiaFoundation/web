import {
  Text,
  ConfigurationSiacoin,
  Button,
  triggerSuccessToast,
  Separator,
  ConfigurationNumber,
  triggerErrorToast,
  useFormChanged,
  monthsToBlocks,
  Reset16,
  TiBToBytes,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect } from 'react'
import { RenterSidenav } from '../../components/RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'
import { useSetting, useSettingUpdate } from '@siafoundation/react-core'
import { useFormik } from 'formik'
import { Setting } from '../../components/Setting'
import { MenuSection } from '../../components/MenuSection'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'

type GougingData = {
  maxStoragePrice: string
  maxDownloadPrice: string
  maxUploadPrice: string
  maxContractPrice: string
  maxRPCPrice: string
  minMaxCollateral: string
  hostBlockHeightLeeway: number
}

type RedundancyData = {
  minShards: number
  totalShards: number
}

const scDecimalPlaces = 6

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

  const settingUpdate = useSettingUpdate()

  const form = useFormik({
    initialValues: {
      // gouging
      maxRpcPrice: new BigNumber(0),
      maxStoragePrice: new BigNumber(0),
      maxContractPrice: new BigNumber(0),
      maxDownloadPrice: new BigNumber(0),
      maxUploadPrice: new BigNumber(0),
      minMaxCollateral: new BigNumber(0),
      hostBlockHeightLeeway: new BigNumber(0),
      // redundancy
      minShards: new BigNumber(0),
      totalShards: new BigNumber(0),
    },
    onSubmit: async (values) => {
      if (!gouging.data || !redundancy.data) {
        return
      }
      try {
        const gougingResponse = await settingUpdate.put({
          params: {
            key: 'gouging',
          },
          payload: {
            maxRPCPrice: toHastings(values.maxRpcPrice).toString(),
            maxStoragePrice: toHastings(
              values.maxStoragePrice // TiB/month
                .div(monthsToBlocks(1)) // TiB/block
                .div(TiBToBytes(1)) // bytes/block
            ).toString(),
            maxContractPrice: toHastings(values.maxContractPrice).toString(),
            maxDownloadPrice: toHastings(values.maxDownloadPrice).toString(),
            maxUploadPrice: toHastings(values.maxUploadPrice).toString(),
            minMaxCollateral: toHastings(values.minMaxCollateral).toString(),
            hostBlockHeightLeeway: values.hostBlockHeightLeeway.toNumber(),
          },
        })
        const redundancyResponse = await settingUpdate.put({
          params: {
            key: 'redundancy',
          },
          payload: {
            minShards: values.minShards.toNumber(),
            totalShards: values.totalShards.toNumber(),
          },
        })
        if (gougingResponse.error) {
          throw Error(gougingResponse.error)
        }
        if (redundancyResponse.error) {
          throw Error(redundancyResponse.error)
        }
        triggerSuccessToast('Configuration has been saved.')
      } catch (e) {
        triggerErrorToast((e as Error).message)
      }
    },
  })

  const resetFormAndData = useCallback(() => {
    form.resetForm()
    gouging.mutate()
    redundancy.mutate()
  }, [form, gouging, redundancy])

  useEffect(() => {
    const func = async () => {
      if (!gouging.data || !redundancy.data) {
        return
      }
      try {
        const gougingData = gouging.data as GougingData
        const redundancyData = redundancy.data as RedundancyData
        // When new config is fetched, reset the form with the initial values
        await form.resetForm({
          values: {
            // gouging
            maxStoragePrice: toSiacoins(
              new BigNumber(gougingData.maxStoragePrice) // bytes/block
                .times(monthsToBlocks(1)) // bytes/month
                .times(TiBToBytes(1)),
              scDecimalPlaces
            ), // TiB/month
            maxDownloadPrice: toSiacoins(
              gougingData.maxDownloadPrice,
              scDecimalPlaces
            ),
            maxUploadPrice: toSiacoins(
              gougingData.maxUploadPrice,
              scDecimalPlaces
            ),
            maxContractPrice: toSiacoins(
              gougingData.maxContractPrice,
              scDecimalPlaces
            ),
            maxRpcPrice: toSiacoins(gougingData.maxRPCPrice, scDecimalPlaces),
            minMaxCollateral: toSiacoins(
              gougingData.minMaxCollateral,
              scDecimalPlaces
            ),
            hostBlockHeightLeeway: new BigNumber(
              gougingData.hostBlockHeightLeeway
            ),
            // redundancy
            minShards: new BigNumber(redundancyData.minShards),
            totalShards: new BigNumber(redundancyData.totalShards),
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
            tip="Reset all changes"
            icon="contrast"
            disabled={!changeCount}
            onClick={() => resetFormAndData()}
          >
            <Reset16 />
          </Button>
          <Button
            tip="Save all changes"
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
            description={<>The max allowed price to store 1 TiB per month.</>}
            control={
              <ConfigurationSiacoin
                decimalsLimitSc={scDecimalPlaces}
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
            description={<>The max allowed price to download 1 TiB.</>}
            control={
              <ConfigurationSiacoin
                decimalsLimitSc={scDecimalPlaces}
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
            description={<>The max allowed price to upload 1 TiB.</>}
            control={
              <ConfigurationSiacoin
                decimalsLimitSc={scDecimalPlaces}
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
                decimalsLimitSc={scDecimalPlaces}
                value={form.values.maxRpcPrice}
                changed={changed.maxRpcPrice}
                onChange={(value) => form.setFieldValue('maxRpcPrice', value)}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Min max collateral"
            description={
              <>
                {`The minimum value for max collateral in the host's price settings.`}
              </>
            }
            control={
              <ConfigurationSiacoin
                decimalsLimitSc={scDecimalPlaces}
                value={form.values.minMaxCollateral}
                changed={changed.minMaxCollateral}
                onChange={(value) =>
                  form.setFieldValue('minMaxCollateral', value)
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Block height leeway"
            description={
              <>{`The amount of blocks of leeway given to the host block height in the host's price table.`}</>
            }
            control={
              <ConfigurationNumber
                units="blocks"
                value={form.values.hostBlockHeightLeeway}
                changed={changed.hostBlockHeightLeeway}
                suggestion={new BigNumber(3)}
                suggestionTip="The recommended value is 3 blocks."
                onChange={(value) =>
                  form.setFieldValue('hostBlockHeightLeeway', value)
                }
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
