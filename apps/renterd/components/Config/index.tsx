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
  TBToBytes,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect } from 'react'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'
import { useSetting, useSettingUpdate } from '@siafoundation/react-renterd'
import { useFormik } from 'formik'
import { Setting } from '../../components/Setting'
import { MenuSection } from '../../components/MenuSection'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import * as Yup from 'yup'

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

const validationSchema = Yup.object().shape({
  // gouging
  maxStoragePrice: Yup.mixed().required('required'),
  maxDownloadPrice: Yup.mixed().required('required'),
  maxUploadPrice: Yup.mixed().required('required'),
  maxContractPrice: Yup.mixed().required('required'),
  maxRpcPrice: Yup.mixed().required('required'),
  minMaxCollateral: Yup.mixed().required('required'),
  hostBlockHeightLeeway: Yup.number().required('required'),
  // redundancy
  minShards: Yup.mixed().required('required'),
  totalShards: Yup.mixed().required('required'),
})

const initialValues = {
  // gouging
  maxRpcPrice: undefined as BigNumber | undefined,
  maxStoragePrice: undefined as BigNumber | undefined,
  maxContractPrice: undefined as BigNumber | undefined,
  maxDownloadPrice: undefined as BigNumber | undefined,
  maxUploadPrice: undefined as BigNumber | undefined,
  minMaxCollateral: undefined as BigNumber | undefined,
  hostBlockHeightLeeway: undefined as BigNumber | undefined,
  // redundancy
  minShards: undefined as BigNumber | undefined,
  totalShards: undefined as BigNumber | undefined,
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

  const settingUpdate = useSettingUpdate()

  const form = useFormik({
    validationSchema,
    initialValues,
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
              values.maxStoragePrice // TB/month
                .div(monthsToBlocks(1)) // TB/block
                .div(TBToBytes(1)) // bytes/block
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
                .times(TBToBytes(1)),
              scDecimalPlaces
            ), // TB/month
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
      sidenav={<RenterdSidenav />}
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
      <div className="p-6 flex flex-col gap-16 max-w-screen-xl">
        <MenuSection title="Gouging">
          <Setting
            title="Max storage price"
            description={<>The max allowed price to store 1 TB per month.</>}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="maxStoragePrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max download price"
            description={<>The max allowed price to download 1 TB.</>}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="maxDownloadPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max upload price"
            description={<>The max allowed price to upload 1 TB.</>}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="maxUploadPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max contract price"
            description={<>The max allowed price to form a contract.</>}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="maxContractPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max RPC price"
            description={<>The max allowed base price for RPCs.</>}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="maxRpcPrice"
                decimalsLimitSc={scDecimalPlaces}
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
                formik={form}
                changed={changed}
                name="minMaxCollateral"
                decimalsLimitSc={scDecimalPlaces}
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
                formik={form}
                changed={changed}
                name="hostBlockHeightLeeway"
                units="blocks"
                suggestion={new BigNumber(6)}
                suggestionTip="The recommended value is 6 blocks."
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
                formik={form}
                changed={changed}
                name="minShards"
                units="shards"
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Total shards"
            description={<>The total amount of shards for each slab.</>}
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="totalShards"
                units="shards"
              />
            }
          />
        </MenuSection>
      </div>
    </RenterdAuthedLayout>
  )
}
