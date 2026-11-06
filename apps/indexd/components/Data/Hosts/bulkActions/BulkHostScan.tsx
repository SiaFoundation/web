import {
  Button,
  LinkButton,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useAdminHostScan } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { pluralize } from '@siafoundation/units'
import { HostData } from '../types'
import { useMutate, useWorkflows } from '@siafoundation/react-core'
import { adminHostRoute, adminHostsRoute } from '@siafoundation/indexd-types'
import { Row } from '@tanstack/react-table'
import { DataView16, InProgress16 } from '@siafoundation/react-icons'
import { routes } from '../../../../config/routes'
import { getHostScanRoute, useIsHostScanning } from '../useHostScanning'

// Scanning a host runs during the request and can take up to a minute when
// the host does not respond. indexd returns the host either way, with
// consecutiveFailedScans reset to 0 on success.
//
// Browsers allow about 6 open HTTP/1.1 connections per server, so scans run a
// few at a time to leave connections for the rest of the app.
const maxConcurrentScans = 3
export function BulkHostScan({
  hosts,
  onSuccess,
}: {
  hosts: HostData[] | Row<HostData>[]
  onSuccess?: () => void
}) {
  const scan = useAdminHostScan()
  const mutate = useMutate()
  const { setWorkflow, removeWorkflow } = useWorkflows()
  const isHostScanning = useIsHostScanning()

  const hostsToScan = useMemo(
    () =>
      hosts.map((host) =>
        'publicKey' in host ? host : (host.original as HostData),
      ),
    [hosts],
  )
  const scanning = hostsToScan.some((host) => isHostScanning(host.publicKey))

  const operation = useCallback(async () => {
    if (scanning) {
      return
    }
    // Mark every host as scanning up front, not only the ones in flight.
    const queuedKey = (publicKey: string) => `queuedScan:${publicKey}`
    for (const host of hostsToScan) {
      setWorkflow(queuedKey(host.publicKey), {
        route: getHostScanRoute(host.publicKey),
      })
    }
    const responses = await mapWithConcurrency(
      hostsToScan,
      maxConcurrentScans,
      async (host) => {
        const response = await scan.post({
          params: {
            hostkey: host.publicKey,
          },
        })
        // Refresh before clearing the scanning state so the host does not
        // briefly show its previous scan.
        await Promise.all([
          mutate((key) => key.startsWith(adminHostsRoute)),
          mutate((key) =>
            key.startsWith(adminHostRoute.replace(':hostkey', host.publicKey)),
          ),
        ])
        removeWorkflow(queuedKey(host.publicKey))
        return response
      },
    )

    if (responses.length === 1) {
      const [response] = responses
      const viewHost = <ViewHostButton publicKey={hostsToScan[0].publicKey} />
      if (response.error) {
        triggerErrorToast({
          title: 'Failed to scan host',
          body: (
            <div className="flex flex-col items-start">
              {response.error}
              {viewHost}
            </div>
          ),
        })
      } else if (response.data?.consecutiveFailedScans === 0) {
        triggerSuccessToast({ title: 'Host scan succeeded', body: viewHost })
      } else {
        triggerErrorToast({
          title: 'Host scan failed',
          body: (
            <div className="flex flex-col items-start">
              {`The host could not be reached. ${pluralize(
                response.data?.consecutiveFailedScans ?? 0,
                'consecutive failed scan',
              )}.`}
              {viewHost}
            </div>
          ),
        })
      }
    } else {
      const errors = responses.filter((r) => r.error).length
      const reachable = responses.filter(
        (r) => r.data?.consecutiveFailedScans === 0,
      ).length
      const failed = responses.length - errors - reachable
      const body = [
        `${reachable} reachable`,
        `${failed} failed`,
        ...(errors ? [`${pluralize(errors, 'error')}`] : []),
      ].join(', ')
      // A single failure can be linked to directly, more are left to the
      // selection and the last scan column.
      const unsuccessful = hostsToScan.filter(
        (_, i) => responses[i].data?.consecutiveFailedScans !== 0,
      )
      const toast = failed || errors ? triggerErrorToast : triggerSuccessToast
      toast({
        title: `Scanned ${pluralize(responses.length, 'host')}`,
        body:
          unsuccessful.length === 1 ? (
            <div className="flex flex-col items-start">
              {`${body}.`}
              <ViewHostButton publicKey={unsuccessful[0].publicKey} />
            </div>
          ) : (
            `${body}.`
          ),
      })
    }

    onSuccess?.()
  }, [
    scanning,
    hostsToScan,
    scan,
    mutate,
    setWorkflow,
    removeWorkflow,
    onSuccess,
  ])

  return (
    <Button
      onClick={operation}
      // waiting blocks clicks without the faded disabled styling.
      state={scanning ? 'waiting' : undefined}
    >
      {scanning ? (
        <>
          <InProgress16 className="animate-spin" />
          Scanning
        </>
      ) : (
        <>
          <DataView16 />
          Scan host{hosts.length > 1 ? `s (${hosts.length})` : ''}
        </>
      )}
    </Button>
  )
}

function ViewHostButton({ publicKey }: { publicKey: string }) {
  return (
    // The toast body clips overflow, so draw the focus ring inside the button
    // and only for keyboard focus.
    <LinkButton
      href={`${routes.hosts.index}?hostsPanelId=${encodeURIComponent(publicKey)}`}
      size="small"
      className="mt-2 focus:ring-0 focus-visible:ring focus-visible:ring-inset"
    >
      View host
    </LinkButton>
  )
}

// Runs fn over items with at most limit calls in flight, starting the next
// item as soon as any call finishes. Results keep the order of items.
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  )
  return results
}
