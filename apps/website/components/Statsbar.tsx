import { Flex, NextLink, Text, webLinks } from '@siafoundation/design-system'
import { Fragment } from 'react'
import useSWR from 'swr'
import { Stats } from '../content/stats'

type Props = {
  stats?: Stats
}

export function Statsbar({ stats }: Props) {
  const { data } = useSWR<Stats>(stats ? null : 'stats', async () => {
    const response = await fetch('/api/stats')
    const result = await response.json()
    return result
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
  } = stats || data || {}
  return (
    <Flex
      gap={{
        '@initial': '5',
        '@bp2': '2',
      }}
      gapY="5"
      direction={{
        '@initial': 'row',
        '@bp2': 'column',
      }}
      justify="start"
      wrap="wrap"
    >
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
        title="Software"
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
  )
}

type StatProps = {
  value: string
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <Flex gap="0-5" wrap="noWrap">
      <Text size="12" css={{ fontWeight: '600' }}>
        {value}
      </Text>
      <Text size="12">{label}</Text>
    </Flex>
  )
}

function Separator() {
  return (
    <Text
      color="subtle"
      size="12"
      css={{
        display: 'none',
        '@bp2': {
          display: 'inline',
        },
      }}
    >
      •
    </Text>
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
    <Flex
      gap={{
        '@initial': '2',
        '@bp2': '1',
      }}
      align={{
        '@initial': 'start',
        '@bp2': 'center',
      }}
      direction={{
        '@initial': 'column',
        '@bp2': 'row',
      }}
    >
      <Text
        size="12"
        color="accent"
        css={{ position: 'relative', top: '-1px' }}
      >
        <NextLink
          href={link}
          target="_blank"
          variant="accent"
          css={{
            textDecoration: 'none',
          }}
        >
          {title}
        </NextLink>
      </Text>
      <Flex
        gap={{
          '@initial': '1-5',
          '@bp2': '1',
        }}
        direction={{
          '@initial': 'column',
          '@bp2': 'row',
        }}
        wrap="wrap"
      >
        {stats.map(({ value, label }, i) => (
          <Fragment key={label}>
            <Stat value={value} label={label} />
            {i < stats.length - 1 && <Separator />}
          </Fragment>
        ))}
      </Flex>
    </Flex>
  )
}
