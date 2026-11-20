import {
  Button,
  FieldText,
  RemoteDataStates,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
  useRemoteData,
  type ConfigFields,
} from '@siafoundation/design-system'
import {
  useAdminObjectAccounts,
  useAdminObjectBlocklistAdd,
  useAdminObjectBlocklistEntry,
  useAdminObjectBlocklistRemove,
} from '@siafoundation/indexd-react'
import { Unlocked16 } from '@siafoundation/react-icons'
import { useCallback, useState } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { EditablePanel } from '../EditablePanel'
import { InfoRow } from '../PanelInfoRow'
import { SidePanel } from '../SidePanel'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import { SidePanelSection } from '../SidePanelSection'
import { SidePanelSkeleton } from '../SidePanelSkeleton'
import { ObjectAccounts, objectAccountsLimit } from './ObjectAccounts'
import { transformBlockedObject } from './transform'
import { useBlockedObjectsParams } from './useBlockedObjectsParams'

type Values = {
  reason: string
}

const fields: ConfigFields<Values, never> = {
  reason: {
    type: 'text',
    title: 'Reason',
    placeholder: 'e.g. dmca-1234',
    validation: {},
  },
}

export function SidePanelObject() {
  const { panelId } = useBlockedObjectsParams()
  if (!panelId) {
    return null
  }
  // Key by the object key so the accounts paging resets when it changes.
  return <BlockedObjectPanel key={panelId} objectKey={panelId} />
}

function BlockedObjectPanel({ objectKey }: { objectKey: string }) {
  const { setPanelId } = useBlockedObjectsParams()
  const { openConfirmDialog } = useDialog()
  const objectBlock = useAdminObjectBlocklistAdd()
  const objectUnblock = useAdminObjectBlocklistRemove()
  const entry = useAdminObjectBlocklistEntry({
    params: {
      objectkey: objectKey,
    },
  })
  const [accountsOffset, setAccountsOffset] = useState(0)
  const accounts = useAdminObjectAccounts({
    params: {
      objectkey: objectKey,
      offset: accountsOffset,
      limit: objectAccountsLimit,
    },
  })
  // A key can be blocked before any object has it, the accounts route
  // returns 404 when no object has the key.
  const objectNotFound = accounts.error?.status === 404
  const data = useRemoteData(
    {
      entry,
    },
    ({ entry }) => ({
      object: transformBlockedObject(entry),
      values: { reason: entry.reason } as Values,
    }),
  )

  const onClose = useCallback(() => setPanelId(undefined), [setPanelId])

  const onSave = useCallback(
    async (values: Values) => {
      const response = await objectBlock.put({
        params: { objectkey: objectKey },
        payload: { reason: values.reason.trim() },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error updating reason',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Reason updated' })
      }
    },
    [objectBlock, objectKey],
  )

  const unblock = useCallback(() => {
    openConfirmDialog({
      title: 'Unblock this object?',
      action: 'Unblock',
      variant: 'accent',
      body: 'The object can be fetched, pinned and shared again.',
      onConfirm: async () => {
        const response = await objectUnblock.delete({
          params: { objectkey: objectKey },
        })
        if (response.error) {
          triggerErrorToast({
            title: 'Error unblocking object',
            body: response.error,
          })
        } else {
          triggerSuccessToast({ title: 'Object unblocked' })
          onClose()
        }
      },
    })
  }, [objectUnblock, openConfirmDialog, objectKey, onClose])

  const heading = (
    <SidePanelHeadingCopyable
      heading="Blocked object"
      value={objectKey}
      label="object key"
    />
  )

  // The entry route returns 404 when the key is not blocked, for example
  // when the panel ID in the URL was unblocked. SWR keeps the last data on
  // error, so check the error first.
  if (entry.error?.status === 404) {
    return (
      <SidePanel heading={heading} onClose={onClose}>
        <div className="flex justify-center pt-[50px]">
          <Text color="subtle">This key is not blocked</Text>
        </div>
      </SidePanel>
    )
  }

  return (
    <RemoteDataStates
      data={data}
      loading={<SidePanelSkeleton withActions onClose={onClose} />}
      error={
        <SidePanel heading={heading} onClose={onClose}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Error loading object</Text>
          </div>
        </SidePanel>
      }
      notFound={null}
      loaded={({ object, values }) => (
        <EditablePanel
          key={object.key}
          heading={heading}
          onClose={onClose}
          remoteValues={values}
          fields={fields}
          onSave={onSave}
          actionsLeft={
            <Button onClick={unblock}>
              <Unlocked16 />
              Unblock
            </Button>
          }
          render={(form, fields) => (
            <>
              <SidePanelSection heading="Blocklist">
                <div className="flex flex-col gap-2">
                  <FieldText name="reason" form={form} fields={fields} />
                  <InfoRow
                    label="Blocked on"
                    value={object.displayFields.createdAt}
                  />
                  {objectNotFound ? (
                    <InfoRow label="Object" value="Not found" />
                  ) : null}
                </div>
              </SidePanelSection>
              {objectNotFound ? null : (
                <SidePanelSection heading="Accounts">
                  <div className="flex flex-col">
                    <ObjectAccounts
                      accounts={accounts}
                      offset={accountsOffset}
                      setOffset={setAccountsOffset}
                    />
                  </div>
                </SidePanelSection>
              )}
            </>
          )}
        />
      )}
    />
  )
}
