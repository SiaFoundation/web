import {
  Button,
  ControlGroup,
  Text,
  Tooltip,
  Select,
  Option,
} from '@siafoundation/design-system'
import { CalendarHeatMap16, Ruler16 } from '@siafoundation/react-icons'
import { useMetrics } from '../../contexts/metrics'
import { HomeRevenue } from './HomeRevenue'
import { HomeStorage } from './HomeStorage'
import { HomeContracts } from './HomeContracts'
import { HomePricing } from './HomePricing'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { routes } from '../../config/routes'
import { HostdSidenav } from '../HostdSidenav'
import { useDialog } from '../../contexts/dialog'
import { DataTimeSpan, dataTimeSpanOptions } from '../../contexts/metrics/types'
import { HomeOperations } from './HomeOperations'
import { HomeBandwidth } from './HomeBandwidth'
import { humanDate } from '@siafoundation/sia-js'
import { HomeCollateral } from './HomeCollateral'

export function Home() {
  const { openDialog } = useDialog()
  const { timeRange, dataTimeSpan, setDataTimeSpan, dataInterval } =
    useMetrics()

  return (
    <HostdAuthedLayout
      title="Overview"
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      nav={
        <div className="flex gap-2 flex-1">
          <ControlGroup>
            <Button state="waiting">
              <Text size="12">
                {humanDate(timeRange.start, { dateStyle: 'long' })}
              </Text>
            </Button>
            <Button state="waiting">
              <Text size="12" color="subtle">
                to
              </Text>
            </Button>
            <Button state="waiting">
              <Text size="12">
                {humanDate(timeRange.end, { dateStyle: 'long' })}
              </Text>
            </Button>
          </ControlGroup>
        </div>
      }
      size="full"
      actions={
        <>
          {/* <Select
            disabled
            value={String(dataInterval)}
            onChange={(e) => {
              const v = e.currentTarget.value
              setDataInterval(v as DataInterval)
            }}
            icon={
              <Tooltip content="Data interval">
                <Text className="pl-1 pr-2">
                  <Ruler16 />
                </Text>
              </Tooltip>
            }
          >
            {dataItervalOptions.map((o) => (
              <Option key={o.value} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select> */}
          <Tooltip side="bottom" content={`Data interval: ${dataInterval}`}>
            <div>
              <Button variant="ghost" state="waiting">
                <Ruler16 />
                {dataInterval}
              </Button>
            </div>
          </Tooltip>
          <Tooltip content="Data time range" side="bottom">
            <div>
              <Select
                value={String(dataTimeSpan)}
                onChange={(e) => {
                  const v = e.currentTarget.value
                  setDataTimeSpan(v as DataTimeSpan)
                }}
                icon={
                  <Text className="pl-1 pr-2">
                    <CalendarHeatMap16 />
                  </Text>
                }
              >
                {dataTimeSpanOptions.map((o) => (
                  <Option key={o.value} value={o.value}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </div>
          </Tooltip>
        </>
      }
    >
      <div className="p-6 flex flex-col gap-14">
        <HomeRevenue />
        <HomeCollateral />
        <HomeStorage />
        <HomeBandwidth />
        <HomeOperations />
        <HomeContracts />
        <HomePricing />
      </div>
    </HostdAuthedLayout>
  )
}
