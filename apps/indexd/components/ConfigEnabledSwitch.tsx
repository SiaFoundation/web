import { Switch, Tooltip } from '@siafoundation/design-system'
import { useConfigEnabled } from './useConfigEnabled'

type Props = {
  size: 'small' | 'medium'
}

export function ConfigEnabledSwitch({ size }: Props) {
  const { toggleEnabled, enabled } = useConfigEnabled()
  return (
    <Tooltip content="Enable or disable forming contracts and maintaining data.">
      <div>
        <Switch size={size} checked={enabled} onCheckedChange={toggleEnabled} />
      </div>
    </Tooltip>
  )
}
