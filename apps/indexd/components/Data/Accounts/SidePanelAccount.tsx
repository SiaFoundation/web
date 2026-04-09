import {
  Button,
  FieldNumber,
  RemoteDataStates,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
  useRemoteData,
} from '@siafoundation/design-system'
import { EditablePanel } from '../EditablePanel'
import { SidePanel } from '../SidePanel'
import { useDialog } from '../../../contexts/dialog'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useAccountsParams } from './useAccountsParams'
import { InfoRow } from '../PanelInfoRow'
import { SidePanelSection } from '../SidePanelSection'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import {
  useAdminAccount,
  useAdminAccountSlabsPrune,
  useAdminAccountUpdate,
} from '@siafoundation/indexd-react'
import { useMutate } from '@siafoundation/react-core'
import { adminAccountsRoute } from '@siafoundation/indexd-types'
import { SidePanelSkeleton } from '../SidePanelSkeleton'
import { transformAccount } from './transform'
import { useCallback, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { ConfigFields } from '@siafoundation/design-system'

type Values = {
  maxPinnedDataGB: BigNumber | undefined
}

function getFields(): ConfigFields<Values, never> {
  return {
    maxPinnedDataGB: {
      type: 'number',
      title: 'Max pinned data (GB)',
      decimalsLimit: 2,
      validation: {
        required: 'required',
      },
    },
  }
}

export function SidePanelAccount() {
  const { panelId, setPanelId } = useAccountsParams()
  const { openDialog, openConfirmDialog } = useDialog()
  const pruneSlabs = useAdminAccountSlabsPrune()
  const accountUpdate = useAdminAccountUpdate()
  const mutate = useMutate()
  const account = useAdminAccount({
    disabled: !panelId,
    params: {
      accountkey: panelId!,
    },
  })
  const data = useRemoteData(
    {
      account,
    },
    ({ account }) => {
      const transformed = transformAccount(account)
      return {
        account: transformed,
        values: {
          maxPinnedDataGB: new BigNumber(account.maxPinnedData).div(1e9),
        } as Values,
      }
    },
  )

  const fields = useMemo(() => getFields(), [])

  const onSave = useCallback(
    async (values: Values) => {
      if (!data.data) {
        return
      }
      const response = await accountUpdate.patch({
        params: {
          accountkey: data.data.account.publicKey,
        },
        payload: {
          maxPinnedData: values.maxPinnedDataGB
            ? values.maxPinnedDataGB.times(1e9).toNumber()
            : 0,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error updating account',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Account updated' })
        await mutate((key) => key.startsWith(adminAccountsRoute))
      }
    },
    [accountUpdate, mutate, data.data],
  )

  return (
    <RemoteDataStates
      data={data}
      loading={
        <SidePanelSkeleton withActions onClose={() => setPanelId(undefined)} />
      }
      notFound={
        <SidePanel heading={null}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Account not found</Text>
          </div>
        </SidePanel>
      }
      loaded={({ account, values }) => (
        <EditablePanel
          key={account.id}
          heading={
            <SidePanelHeadingCopyable
              heading="Account"
              value={account.id}
              label="account"
            />
          }
          onClose={() => setPanelId(undefined)}
          remoteValues={values}
          fields={fields}
          onSave={onSave}
          actionsLeft={
            <div className="flex items-center gap-2">
              <Button
                onClick={() =>
                  openConfirmDialog({
                    title: 'Prune orphaned slabs?',
                    action: 'Prune',
                    variant: 'accent',
                    body: null,
                    onConfirm: async () => {
                      const response = await pruneSlabs.post({
                        params: { accountkey: account.publicKey },
                      })
                      if (response.error) {
                        triggerErrorToast({
                          title: 'Failed to prune slabs',
                          body: response.error,
                        })
                      } else {
                        triggerSuccessToast({ title: 'Slabs pruned' })
                      }
                    },
                  })
                }
              >
                Prune slabs
              </Button>
              <Button
                onClick={() => openDialog('accountDelete', account.id)}
                variant="red"
              >
                <TrashCan16 />
                Delete account
              </Button>
            </div>
          }
          render={(form, fields) => (
            <>
              <SidePanelSection heading="Storage">
                <div className="flex flex-col gap-2">
                  <FieldNumber
                    name="maxPinnedDataGB"
                    form={form}
                    fields={fields}
                  />
                  <InfoRow
                    label="Pinned data"
                    value={account.displayFields.pinnedData}
                  />
                </div>
              </SidePanelSection>
              <SidePanelSection heading="Info">
                <div className="flex flex-col gap-2">
                  <InfoRow
                    label="Description"
                    value={account.description}
                    variant="column"
                  />
                  <InfoRow
                    label="Last used"
                    value={account.displayFields.lastUsed}
                  />
                  <InfoRow label="Logo URL" value={account.logoURL} />
                  <InfoRow label="Service URL" value={account.serviceURL} />
                </div>
              </SidePanelSection>
            </>
          )}
        />
      )}
    />
  )
}
