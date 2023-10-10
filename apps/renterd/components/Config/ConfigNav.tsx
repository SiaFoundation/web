import { Text, Switch, Tooltip } from '@siafoundation/design-system'
import { useConfig } from '../../contexts/config'

export function ConfigNav() {
  const { showAdvanced, setShowAdvanced } = useConfig()

  return (
    <div className="pl-1">
      <Tooltip content={showAdvanced ? 'Hide advanced' : 'Show advanced'}>
        <div className="flex gap-1 items-center">
          <Switch
            checked={showAdvanced}
            onCheckedChange={(checked) => setShowAdvanced(checked)}
          />
          <Text size="12" color="subtle">
            Advanced
          </Text>
        </div>
      </Tooltip>
    </div>
  )
}
