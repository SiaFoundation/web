import { Switch, Tooltip } from '@siafoundation/design-system'
import { useConfig } from '../../contexts/config'

export function ViewModeToggle() {
  const { configViewMode, setConfigViewMode } = useConfig()

  return (
    <div className="pl-1">
      <Tooltip
        content={
          configViewMode === 'advanced'
            ? 'Show advanced settings'
            : 'Hide advanced settings'
        }
      >
        <div>
          <Switch
            aria-label="configViewMode"
            checked={configViewMode === 'advanced'}
            onCheckedChange={(checked) =>
              setConfigViewMode(checked ? 'advanced' : 'basic')
            }
          />
        </div>
      </Tooltip>
    </div>
  )
}
