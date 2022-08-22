import { Flex } from '@siafoundation/design-system'
import { AuthedLayout } from '../components/AuthedLayout'
import { TimeSpan, useData } from '../contexts/data'
import { format } from 'date-fns'
import { HomeRevenue } from '../components/HomeRevenue'
// import { HomeOverview } from '../components/HomeOverview'
import { HomeUtilization } from '../components/HomeUtilization'
import { HomeContracts } from '../components/HomeContracts'
import { HomePricing } from '../components/HomePricing'
import { RadioButton } from '../components/RadioButton'

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
    <AuthedLayout
      title={`${format(timeRange.start, 'PP')} - ${format(
        timeRange.end,
        'PP'
      )}`}
      actions={
        <>
          <RadioButton
            options={options}
            value={String(timeSpan)}
            onChange={(value) =>
              setTimeSpan((value !== 'all' ? Number(value) : value) as TimeSpan)
            }
          />
        </>
      }
    >
      <Flex direction="column" gap="7">
        {/* <HomeOverview /> */}
        <HomeRevenue />
        <HomeUtilization />
        <HomeContracts />
        <HomePricing />
      </Flex>
    </AuthedLayout>
  )
}
