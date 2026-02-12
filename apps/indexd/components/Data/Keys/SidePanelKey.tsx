import {
  Button,
  Text,
  useRemoteData,
  RemoteDataStates,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { Filter16, TrashCan16 } from '@siafoundation/react-icons'
import { useKeysParams } from './useKeysParams'
import { InfoRow } from '../PanelInfoRow'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import {
  useAdminConnectKey,
  useAdminConnectKeyUpdate,
  useAdminQuotas,
} from '@siafoundation/indexd-react'
import {
  FieldSelect,
  FieldText,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useMutate } from '@siafoundation/react-core'
import { adminConnectKeysRoute } from '@siafoundation/indexd-types'
import { EditablePanel } from '../EditablePanel'
import { SidePanel } from '../SidePanel'
import { SidePanelSkeleton } from '../SidePanelSkeleton'
import {
  getFields,
  transformDown,
  transformUpForm,
  Values,
} from '../../../lib/connectKey'
import { SidePanelSection } from '../SidePanelSection'
import { useAccountsParams } from '../Accounts/useAccountsParams'
import { routes } from '../../../config/routes'
import { useNavigateWithParams } from '../../../lib/navigation'

export function SidePanelKey() {
  const { panelId, setPanelId } = useKeysParams()
  const { buildAddColumnFilterParams: buildAccountAddColumnFilterParams } =
    useAccountsParams()
  const navigate = useNavigateWithParams()
  const { openDialog } = useDialog()
  const keyUpdate = useAdminConnectKeyUpdate()
  const mutate = useMutate()
  const quotas = useAdminQuotas()
  const connectKey = useAdminConnectKey({
    disabled: !panelId,
    params: {
      key: panelId!,
    },
  })

  const fields = useMemo(() => getFields(quotas.data), [quotas.data])

  const dataState = useRemoteData(
    {
      connectKey,
    },
    ({ connectKey }) => transformDown(connectKey),
  )

  const onSave = useCallback(
    async (values: Values) => {
      if (!dataState.data) {
        return
      }
      const response = await keyUpdate.put({
        payload: {
          ...dataState.data.connectKey,
          ...transformUpForm(values),
        },
      })
      if (response.error) {
        triggerErrorToast({ title: 'Error saving key', body: response.error })
      } else {
        triggerSuccessToast({ title: 'Key updated' })
        await mutate((key) => key.startsWith(adminConnectKeysRoute))
      }
    },
    [keyUpdate, mutate, dataState.data],
  )

  return (
    <RemoteDataStates
      data={dataState}
      loading={
        <SidePanelSkeleton withActions onClose={() => setPanelId(undefined)} />
      }
      notFound={
        <SidePanel heading={null}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Key not found</Text>
          </div>
        </SidePanel>
      }
      loaded={({ connectKey, values }) => (
        <EditablePanel
          key={connectKey.key}
          heading={
            <SidePanelHeadingCopyable
              heading="Key"
              value={connectKey.key}
              label="key"
            />
          }
          onClose={() => setPanelId(undefined)}
          remoteValues={values}
          fields={fields}
          onSave={onSave}
          actionsLeft={
            <div className="flex gap-2">
              <Button
                onClick={() => openDialog('connectKeyDelete', connectKey.key)}
              >
                <TrashCan16 />
              </Button>
              <Button
                onClick={() => {
                  navigate(
                    routes.accounts.index,
                    buildAccountAddColumnFilterParams({
                      id: 'connectkey',
                      value: connectKey.key,
                    }),
                  )
                }}
              >
                <Filter16 />
                Accounts
              </Button>
            </div>
          }
          render={(form, fields) => {
            return (
              <SidePanelSection heading="Info">
                <div className="flex flex-col gap-2">
                  <FieldText name="description" form={form} fields={fields} />
                  <FieldSelect name="quota" form={form} fields={fields} />
                  <InfoRow
                    label="Remaining uses"
                    value={connectKey.remainingUses.toString()}
                  />
                  <InfoRow
                    label="Pinned data"
                    value={connectKey.displayFields.pinnedData}
                  />
                  <InfoRow
                    label="Date created"
                    value={connectKey.displayFields.dateCreated}
                  />
                  <InfoRow
                    label="Last updated"
                    value={connectKey.displayFields.lastUpdated}
                  />
                  <InfoRow
                    label="Last used"
                    value={connectKey.displayFields.lastUsed}
                  />
                </div>
              </SidePanelSection>
            )
          }}
        />
      )}
    />
  )
}
