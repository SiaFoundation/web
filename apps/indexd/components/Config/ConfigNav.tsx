import { ConfigEnabledSwitch } from '../ConfigEnabledSwitch'

export function ConfigNav() {
  return (
    <div className="pl-1">
      <div className="flex items-center gap-2">
        <ConfigEnabledSwitch size="small" />
      </div>
    </div>
  )
}
