import { Heading, Panel } from '@siafoundation/design-system'
import { MetricsSectors } from './MetricsSectors'
import { MetricsAccounts } from './MetricsAccounts'
import { MetricsContracts } from './MetricsContracts'
import { MetricsConnectKeys } from './MetricsConnectKeys'

export function Metrics() {
  return (
    <div className="flex flex-wrap gap-5 p-5">
      <Panel className="flex flex-col gap-5 p-5">
        <Heading size="24">Accounts</Heading>
        <div className="w-[400px]">
          <MetricsAccounts />
        </div>
      </Panel>
      <Panel className="flex flex-col gap-5 p-5">
        <Heading size="24">Connect Keys</Heading>
        <div className="w-[400px]">
          <MetricsConnectKeys />
        </div>
      </Panel>
      <Panel className="flex flex-col gap-5 p-5">
        <Heading size="24">Contracts</Heading>
        <div className="w-[400px]">
          <MetricsContracts />
        </div>
      </Panel>
      <Panel className="flex flex-col gap-5 p-5">
        <Heading size="24">Sectors</Heading>
        <div className="w-[400px]">
          <MetricsSectors />
        </div>
      </Panel>
    </div>
  )
}
