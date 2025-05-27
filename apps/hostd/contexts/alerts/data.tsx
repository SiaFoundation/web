import { Text, ValueCopyable } from '@siafoundation/design-system'
import { humanTime } from '@siafoundation/units'
import { AlertData } from './types'

export const dataFields: {
  [K in keyof AlertData['data']]: {
    render: (props: { value: NonNullable<AlertData['data'][K]> }) => JSX.Element
  }
} = {
  error: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            error
          </Text>
          <Text size="12" color="contrast">
            {value}
          </Text>
        </div>
      )
    },
  },
  contractID: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            contract ID
          </Text>
          <ValueCopyable size="12" value={String(value)} />
        </div>
      )
    },
  },
  blockHeight: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            block height
          </Text>
          <ValueCopyable size="12" value={String(value)} type="block" />
        </div>
      )
    },
  },
  resolution: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            resolution
          </Text>
          <ValueCopyable size="12" value={String(value)} />
        </div>
      )
    },
  },
  volume: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            volume
          </Text>
          <ValueCopyable size="12" value={String(value)} />
        </div>
      )
    },
  },
  volumeID: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            volume ID
          </Text>
          <ValueCopyable size="12" value={String(value)} />
        </div>
      )
    },
  },
  elapsed: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            elapsed
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {humanTime(Number(value))}
          </Text>
        </div>
      )
    },
  },
  checked: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            checked
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  missing: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            missing
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  corrupt: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            corrupt
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  total: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            total
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  oldSectors: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            old sectors
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  currentSectors: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            current sectors
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  targetSectors: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            target sectors
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  migratedSectors: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            migrated sectors
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  migrated: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            migrated
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  target: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            target
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value.toLocaleString()}
          </Text>
        </div>
      )
    },
  },
  force: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            force
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value ? 'true' : 'false'}
          </Text>
        </div>
      )
    },
  },
  current: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            current
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value}
          </Text>
        </div>
      )
    },
  },
  latest: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            latest
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value}
          </Text>
        </div>
      )
    },
  },
}
