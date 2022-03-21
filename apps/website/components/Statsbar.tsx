import { Flex, NextLink, Section, Text } from '@siafoundation/design-system'
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
    <Section
      fullWidth
      size="1"
      css={{
        backgroundColor: '$waves',
      }}
    >
      <Section size="0" gap="2">
        <Flex gap="1" wrap="wrap">
          <Text size="12">
            <NextLink
              href={external.stats}
              target="_blank"
              variant="subtle"
              css={{ textDecoration: 'none', fontFamily: '$sans' }}
            >
              Network
            </NextLink>
          </Text>
          <Stat value={activeHosts} label="active hosts" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={onlineHosts} label="online hosts" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={totalStorage} label="total storage" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={usedStorage} label="used storage" />
        </Flex>
        <Flex gap="1" wrap="wrap">
          <Text size="12">
            <NextLink
              href={external.github}
              target="_blank"
              variant="subtle"
              css={{ textDecoration: 'none', fontFamily: '$sans' }}
            >
              Software
            </NextLink>
          </Text>
          <Stat value={commits} label="commits" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={contributors} label="contributors" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={forks} label="forks" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={releases} label="releases" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={downloads} label="downloads" />
        </Flex>
        <Flex gap="1" wrap="wrap">
          <Text size="12">
            <NextLink
              href={external.benchmarks}
              target="blank"
              variant="subtle"
              css={{ textDecoration: 'none', fontFamily: '$sans' }}
            >
              Benchmarks
            </NextLink>
          </Text>
          <Stat value={downloadSpeed} label="download" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={uploadSpeed} label="upload" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={cpuUsage} label="CPU usage" />
          <Text color="subtle" size="12">
            •
          </Text>
          <Stat value={memoryUsage} label="memory usage" />
        </Flex>
      </Section>
    </Section>
  )
}

type StatProps = {
  value: string
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <Flex gap="0-5">
      <Text size="12" css={{ fontWeight: '600' }}>
        {value}
      </Text>
      <Text size="12">{label}</Text>
    </Flex>
  )
}
