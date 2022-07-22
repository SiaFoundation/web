import { Button, Calendar20, Flex, Panel } from '@siafoundation/design-system'
import { AuthedLayout } from '../components/AuthedLayout'
import { useData } from '../contexts/data'
import { format } from 'date-fns'
import { HomeRevenue } from '../components/HomeRevenue'
// import { HomeOverview } from '../components/HomeOverview'
import { HomeUtilization } from '../components/HomeUtilization'
import { HomeContracts } from '../components/HomeContracts'
import { HomePricing } from '../components/HomePricing'

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
          <Panel css={{ p: '$0-5', backgroundColor: '$slate5' }}>
            <Flex gap="1">
              <Button
                size="1"
                onClick={() => setTimeSpan(7)}
                ghost={timeSpan !== 7}
              >
                7D
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan(30)}
                ghost={timeSpan !== 30}
              >
                1M
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan(90)}
                ghost={timeSpan !== 90}
              >
                3M
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan(365)}
                ghost={timeSpan !== 365}
              >
                1Y
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan('all')}
                ghost={timeSpan !== 'all'}
              >
                ALL
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan('all')}
                ghost={timeSpan !== 'all'}
              >
                <Calendar20 />
              </Button>
            </Flex>
          </Panel>
          {/* <Tooltip content="Accept contracts">
            <Switch size="2" />
          </Tooltip>
          <Button size="2">Announce</Button> */}
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
