import {
  Button,
  ControlGroup,
  Text,
  CalendarHeatMap16,
  Tooltip,
  Select,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'
import { format } from 'date-fns'
import { HomeRevenue } from './HomeRevenue'
import { HomeUtilization } from './HomeUtilization'
import { HomeContracts } from './HomeContracts'
import { HomePricing } from './HomePricing'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { routes } from '../../config/routes'
import { HostdSidenav } from '../HostdSidenav'
import { useDialog } from '../../contexts/dialog'
import { DataTimeSpan, dataTimeSpanOptions } from '../../contexts/metrics/types'

export function Home() {
  const { openDialog } = useDialog()
  const { timeRange, dataTimeSpan, setDataTimeSpan } = useMetrics()

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
              <Text size="12">{format(timeRange.start, 'PP')}</Text>
            </Button>
            <Button state="waiting">
              <Text size="12" color="subtle">
                to
              </Text>
            </Button>
            <Button state="waiting">
              <Text size="12">{format(timeRange.end, 'PP')}</Text>
            </Button>
          </ControlGroup>
        </div>
      }
      size="full"
      actions={
        <>
          {/* <Select
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
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select> */}
          <Select
            value={String(dataTimeSpan)}
            onChange={(e) => {
              const v = e.currentTarget.value
              setDataTimeSpan(v as DataTimeSpan)
            }}
            icon={
              <Tooltip content="Data time range">
                <Text className="pl-1 pr-2">
                  <CalendarHeatMap16 />
                </Text>
              </Tooltip>
            }
          >
            {dataTimeSpanOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </>
      }
    >
      <div className="p-6 flex flex-col gap-14">
        <HomeRevenue />
        <HomeUtilization />
        <HomeContracts />
        <HomePricing />
      </div>
    </HostdAuthedLayout>
  )
}
