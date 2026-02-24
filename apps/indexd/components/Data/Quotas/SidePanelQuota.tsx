import {
  Button,
  Text,
  useRemoteData,
  RemoteDataStates,
  FieldText,
  FieldNumber,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useQuotasParams } from './useQuotasParams'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import {
  useAdminQuota,
  useAdminQuotaUpdate,
} from '@siafoundation/indexd-react'
import { useMutate } from '@siafoundation/react-core'
import { adminQuotasRoute } from '@siafoundation/indexd-types'
import { EditablePanel } from '../EditablePanel'
import { SidePanel } from '../SidePanel'
import { SidePanelSkeleton } from '../SidePanelSkeleton'
import {
  getFields,
  transformDown,
  transformUpForm,
  Values,
} from '../../../lib/quota'
import { SidePanelSection } from '../SidePanelSection'

export function SidePanelQuota() {
  const { panelId, setPanelId } = useQuotasParams()
  const { openDialog } = useDialog()
  const quotaUpdate = useAdminQuotaUpdate()
  const mutate = useMutate()
  const adminQuota = useAdminQuota({
    disabled: !panelId,
    params: {
      key: panelId!,
    },
  })

  const fields = useMemo(() => getFields(), [])

  const dataState = useRemoteData(
    {
      adminQuota,
    },
    ({ adminQuota }) => transformDown(adminQuota),
  )

  const onSave = useCallback(
    async (values: Values) => {
      if (!dataState.data) {
        return
      }
      const response = await quotaUpdate.put({
        params: {
          key: dataState.data.quota.key,
        },
        payload: transformUpForm(values),
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error saving quota',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Quota updated' })
        await mutate((key) => key.startsWith(adminQuotasRoute))
      }
    },
    [quotaUpdate, mutate, dataState.data],
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
            <Text color="subtle">Quota not found</Text>
          </div>
        </SidePanel>
      }
      loaded={({ quota, values }) => (
        <EditablePanel
          key={quota.key}
          heading={
            <SidePanelHeadingCopyable
              heading="Quota"
              value={quota.key}
              label="key"
            />
          }
          onClose={() => setPanelId(undefined)}
          remoteValues={values}
          fields={fields}
          onSave={onSave}
          actionsLeft={
            <Button
              onClick={() => openDialog('quotaDelete', quota.key)}
            >
              <TrashCan16 />
            </Button>
          }
          render={(form, fields) => {
            return (
              <SidePanelSection heading="Info">
                <div className="flex flex-col gap-2">
                  <FieldText name="description" form={form} fields={fields} />
                  <FieldNumber
                    name="maxPinnedDataGB"
                    form={form}
                    fields={fields}
                  />
                  <FieldNumber
                    name="totalUses"
                    form={form}
                    fields={fields}
                  />
                  <FieldNumber
                    name="fundTargetGB"
                    form={form}
                    fields={fields}
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
