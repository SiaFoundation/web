import { Flex, NextLink, Text } from '@siafoundation/design-system'
import { Fragment } from 'react'
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
        link={external.stats}
        stats={[
          {
            value: activeHosts,
            label: 'active hosts',
          },
          {
            value: onlineHosts,
            label: 'online hosts',
          },
          {
            value: totalStorage,
            label: 'total storage',
          },
          {
            value: usedStorage,
            label: 'used storage',
          },
        ]}
      />
      <StatSection
        title="Benchmarks"
        link={external.benchmarks}
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
      />
      <StatSection
        title="Software"
        link={external.github}
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
