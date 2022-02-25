import { Flex, NLink, Separator, Text } from '@siafoundation/design-system'
import { external } from '../config/site'
import { Stats } from '../content/stats'

export function Statsbar({
  activeHosts,
  onlineHosts,
  totalStorage,
  usedStorage,
  commits,
  contributors,
  forks,
  releases,
  downloads,
  downloadSpeed,
  uploadSpeed,
  cpuUsage,
  memoryUsage,
}: Stats) {
  return (
    <Flex gap="3" wrap="wrap">
      <NLink href={external.stats} target="_blank" variant="subtle">
        Network
      </NLink>
      <Text>{activeHosts} active hosts</Text>
      <Text>{onlineHosts} online hosts</Text>
      <Text>{totalStorage} total storage</Text>
      <Text>{usedStorage} used storage</Text>
      <Separator orientation="vertical" />
      <NLink href={external.github} target="_blank" variant="subtle">
        Software
      </NLink>
      <Text>{commits} commits</Text>
      <Text>{contributors} contributors</Text>
      <Text>{forks} forks</Text>
      <Text>{releases} releases</Text>
      <Text>{downloads} downloads</Text>
      <Separator orientation="vertical" />
      <NLink href={external.benchmarks} target="blank" variant="subtle">
        Benchmarks
      </NLink>
      <Text>{downloadSpeed} download</Text>
      <Text>{uploadSpeed} upload</Text>
      <Text>{cpuUsage} CPU usage</Text>
      <Text>{memoryUsage} memory usage</Text>
    </Flex>
  )
}
