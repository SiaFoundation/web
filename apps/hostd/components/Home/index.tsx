import {
  Button,
  ControlGroup,
  Text,
  SwitchMulti,
} from '@siafoundation/design-system'
import { TimeSpan, useData } from '../../contexts/data'
import { format } from 'date-fns'
import { HomeRevenue } from './HomeRevenue'
// import { HomeOverview } from './HomeOverview'
import { HomeUtilization } from './HomeUtilization'
import { HomeContracts } from './HomeContracts'
import { HomePricing } from './HomePricing'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { routes } from '../../config/routes'
import { HostdSidenav } from '../HostdSidenav'
import { useDialog } from '../../contexts/dialog'

const options = [
  {
    label: '7D',
    value: '7',
  },
  {
    label: '1M',
    value: '30',
  },
  {
    label: '3M',
    value: '90',
  },
  {
    label: '1Y',
    value: '365',
  },
  {
    label: 'ALL',
    value: 'all',
  },
]

export function Home() {
  const { openDialog } = useDialog()
  const { timeRange, timeSpan, setTimeSpan } = useData()

  return (
    <HostdAuthedLayout
      title="Overview"
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      size="full"
      nav={
        <div className="flex gap-2 flex-1">
          <ControlGroup>
            <Button disabled>
              <Text size="12">{format(timeRange.start, 'PP')}</Text>
            </Button>
            <Button disabled>
              <Text size="12" color="subtle">
                to
              </Text>
            </Button>
            <Button disabled>
              <Text size="12">{format(timeRange.end, 'PP')}</Text>
            </Button>
          </ControlGroup>
        </div>
      }
      actions={
        <>
          <SwitchMulti
            options={options}
            value={String(timeSpan)}
            onChange={(value) =>
              setTimeSpan((value !== 'all' ? Number(value) : value) as TimeSpan)
            }
          />
        </>
      }
    >
      <div className="flex flex-col gap-14">
        {/* <HomeOverview /> */}
        <HomeRevenue />
        <HomeUtilization />
        <HomeContracts />
        <HomePricing />
      </div>
    </HostdAuthedLayout>
  )
}
