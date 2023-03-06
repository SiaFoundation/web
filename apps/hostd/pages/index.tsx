import {
  Button,
  ControlGroup,
  Text,
  SwitchMulti,
} from '@siafoundation/design-system'
import { TimeSpan, useData } from '../contexts/data'
import { format } from 'date-fns'
import { HomeRevenue } from '../components/HomeRevenue'
// import { HomeOverview } from '../components/HomeOverview'
import { HomeUtilization } from '../components/HomeUtilization'
import { HomeContracts } from '../components/HomeContracts'
import { HomePricing } from '../components/HomePricing'
import { HostdAuthedLayout } from '../components/HostdAuthedLayout'

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

export default function HomePage() {
  const { timeRange, timeSpan, setTimeSpan } = useData()

  return (
    <HostdAuthedLayout
      title="Overview"
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
