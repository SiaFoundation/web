import {
  Flex,
  NextLink,
  Paragraph,
  Text,
  webLinks,
} from '@siafoundation/design-system'
import useSWR from 'swr'
import { Stats } from '../content/stats'

export function Statsbar() {
  const { data } = useSWR<Stats>('/api/stats', async () => {
    const response = await fetch('/api/stats')
    return response.json()
  })
  const {
    activeHosts,
    onlineHosts,
    blockHeight,
    totalStorage,
    usedStorage,
    totalRegistry,
    usedRegistry,
    commits,
    contributors,
    forks,
    releases,
    downloads,
    // downloadSpeed,
    // uploadSpeed,
    // cpuUsage,
    // memoryUsage,
  } = data || {}
  return (
    <Flex direction="column" gap="3">
      {/* <Heading font="mono">Numbers</Heading> */}
      <Flex gap="10" gapY="6" justify="start" wrap="wrap">
        <StatSection
          title="Network"
          link={webLinks.siaStats}
          stats={[
            {
              value: blockHeight,
              label: 'block height',
            },
            {
              value: onlineHosts,
              label: 'online hosts',
            },
            {
              value: activeHosts,
              label: 'active hosts',
            },
          ]}
        />
        <StatSection
          title="Storage"
          link={webLinks.storageStats}
          stats={[
            {
              value: totalStorage,
              label: 'total storage',
            },
            {
              value: usedStorage,
              label: 'used storage',
            },
            {
              value: totalRegistry,
              label: 'total registry',
            },
            {
              value: usedRegistry,
              label: 'used registry',
            },
          ]}
        />
        {/* <StatSection
        title="Benchmarks"
        link={webLinks.benchmarks}
        stats={[
          {
            value: downloadSpeed,
            label: 'download',
          },
          {
            value: uploadSpeed,
            label: 'upload',
          },
          {
            value: cpuUsage,
            label: 'CPU usage',
          },
          {
            value: memoryUsage,
            label: 'memory usage',
          },
        ]}
      /> */}
        <StatSection
          title="Development"
          link={webLinks.github}
          stats={[
            {
              value: commits,
              label: 'commits',
            },
            {
              value: contributors,
              label: 'contributors',
            },
            {
              value: forks,
              label: 'forks',
            },
            {
              value: releases,
              label: 'releases',
            },
            {
              value: downloads,
              label: 'downloads',
            },
          ]}
        />
      </Flex>
    </Flex>
  )
}

type StatProps = {
  value: string
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <Paragraph font="mono" size="14">
      {value} {label}
    </Paragraph>
  )
}

type Stat = {
  value: string
  label: string
}

type StatSectionProps = {
  title: string
  link: string
  stats: Stat[]
}

function StatSection({ title, link, stats }: StatSectionProps) {
  return (
    <Flex direction="column" gap="3">
      <Text size="18" font="mono" color="accent" weight="extrabold">
        <NextLink href={link} target="_blank" variant="accent">
          {title}
        </NextLink>
      </Text>
      <Flex direction="column" gap="1">
        {stats.map(({ value, label }) => (
          <Stat key={label} value={value} label={label} />
        ))}
      </Flex>
    </Flex>
  )
}
