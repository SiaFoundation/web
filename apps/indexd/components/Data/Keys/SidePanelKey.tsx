import {
  Button,
  Text,
  useRemoteData,
  RemoteDataStates,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useKeysParams } from './useKeysParams'
import { InfoRow } from '../PanelInfoRow'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import {
  useAdminConnectKey,
  useAdminConnectKeyUpdate,
} from '@siafoundation/indexd-react'
import {
  FieldNumber,
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

const fields = getFields()

export function SidePanelKey() {
  const { panelId, setPanelId } = useKeysParams()
  const { openDialog } = useDialog()
  const keyUpdate = useAdminConnectKeyUpdate()
  const mutate = useMutate()
  const connectKey = useAdminConnectKey({
    disabled: !panelId,
    params: {
      key: panelId!,
    },
  })

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
            <Button
              onClick={() => openDialog('connectKeyDelete', connectKey.key)}
              variant="ghost"
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
                    name="remainingUses"
                    form={form}
                    fields={fields}
                  />
                  <InfoRow
                    label="Total uses"
                    value={connectKey.displayFields.totalUses}
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
