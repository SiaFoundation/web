import {
  ConfigFields,
  FieldNumber,
  FieldSwitch,
  Label,
  Separator,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { Path, UseFormReturn } from 'react-hook-form'
import BigNumber from 'bignumber.js'
import { useRescanStart } from '@siafoundation/walletd-react'
import { CalloutWarning } from './CalloutWarning'

export function getRescanFields() {
  return {
    shouldRescan: {
      type: 'boolean',
      title: 'Enable',
      validation: {},
    },
    rescanStartHeight: {
      type: 'number',
      decimalsLimit: 0,
      title: 'Start height',
      validation: {},
    },
  } as const
}

export function getDefaultRescanValues({
  rescanStartHeight,
}: {
  rescanStartHeight?: number
} = {}) {
  return {
    shouldRescan: false,
    rescanStartHeight: new BigNumber(rescanStartHeight || 0),
  }
}

type Values = ReturnType<typeof getDefaultRescanValues>

type Props<V extends Values> = {
  fields: ConfigFields<V, never>
  form: UseFormReturn<V>
}

export function FieldRescan<V extends Values>({ form, fields }: Props<V>) {
  const shouldRescan = form.watch('shouldRescan' as Path<V>)
  const showDetails = shouldRescan
  return (
    <div className="flex flex-col gap-1 pt-4">
      <Separator className="w-full my-2" />
      <Label color="contrast" className="pb-2" size="16">
        Advanced
      </Label>
      <div className="flex flex-col gap-2">
        <Label color="contrast">Rescan</Label>
      </div>
      <div className="flex justify-start gap-3">
        <FieldSwitch
          form={form}
          fields={fields}
          name={'shouldRescan' as Path<V>}
        />
        {showDetails && (
          <FieldNumber
            form={form}
            fields={fields}
            name={'rescanStartHeight' as Path<V>}
          />
        )}
      </div>
      {showDetails && (
        <Text size="14" color="subtle">
          Rescan the blockchain from the specified start height to find any
          missing transaction activity across all wallets.
        </Text>
      )}
      {showDetails && (
        <div className="pt-2 flex flex-col gap-2">
          <RescanCalloutWarningExpensive />
          <RescanCalloutWarningStartHeight />
        </div>
      )}
    </div>
  )
}

export function RescanCalloutWarningExpensive() {
  return (
    <CalloutWarning
      label="Warning"
      description={
        <>
          Only rescan the blockchain if you have added addresses with past
          transactions activity. Rescanning the blockchain is a very expensive
          operation and can take a long time.
        </>
      }
    />
  )
}

export function RescanCalloutWarningStartHeight() {
  return (
    <CalloutWarning
      label="Warning"
      description={
        <>
          For start height, select the highest block height possible, but one
          that you are sure is before the first transaction activity for the
          addresses you have added.
        </>
      }
    />
  )
}

export function useTriggerRescan() {
  const rescan = useRescanStart()
  return async (values: Values) => {
    if (values.shouldRescan) {
      const response = await rescan.post({
        payload: values.rescanStartHeight
          ? values.rescanStartHeight.toNumber()
          : 0,
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error rescanning the blockchain',
          body: response.error,
        })
      } else {
        triggerSuccessToast({
          title: 'Rescanning the blockchain',
          body: 'The blockchain is being rescanned for relevant wallet events.',
        })
      }
    }
  }
}
