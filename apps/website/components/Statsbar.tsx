import { Link, Paragraph, Text, webLinks } from '@siafoundation/design-system'
import useSWR from 'swr'
import { routes } from '../config/routes'
import { Stats } from '../content/stats'

export function Statsbar() {
  const { data } = useSWR<Stats>('/api/stats', async () => {
    const response = await fetch('/api/stats')
    return response.json()
  })
  const {
    activeHosts,
    blockHeight,
    totalStorage,
    usedStorage,
    commits,
    contributors,
    forks,
    releases,
  } = data || {}
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-x-20 gap-y-12 justify-start flex-wrap">
        <StatSection
          title="Network"
          link={webLinks.explore.mainnet}
          target="_blank"
          stats={[
            {
              value: blockHeight,
              label: 'block height',
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
          target="_blank"
          stats={[
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
          title="Development"
          link={routes.activity.index}
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
          ]}
        />
      </div>
    </div>
  )
}

type StatProps = {
  value: string
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <Paragraph font="mono" size="12">
      {value}{' '}
      <Text color="subtle" font="sans" size="12">
        {label}
      </Text>
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
  target?: string
  stats: Stat[]
}

function StatSection({ title, link, target, stats }: StatSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        scaleSize="18"
        font="mono"
        color="accent"
        weight="extrabold"
        href={link}
        target={target}
        className="no-underline hover:underline"
      >
        {title}
      </Link>
      <div className="flex flex-col gap-2">
        {stats.map(({ value, label }) => (
          <Stat key={label} value={value} label={label} />
        ))}
      </div>
    </div>
  )
}
