import {
  CheckmarkFilled16,
  Misuse16,
  Text,
  WarningFilled16,
} from '@siafoundation/design-system'

export const healthThresholds = {
  excellent: 1,
  good: 0.5,
  poor: 0,
}

export function useHealthLabel({
  health,
  size,
  isDirectory,
}: {
  health: number
  size: number
  isDirectory: boolean
}) {
  let label = 'excellent'
  let color: React.ComponentProps<typeof Text>['color'] = 'green'
  let displayHealth = health
  let icon = <CheckmarkFilled16 />
  if (health < healthThresholds.excellent) {
    label = 'good'
    color = 'green'
    icon = <CheckmarkFilled16 />
  }
  if (health < healthThresholds.good) {
    label = 'poor'
    color = 'amber'
    icon = <WarningFilled16 />
  }
  if (health < healthThresholds.poor) {
    label = 'bad'
    color = 'red'
    icon = <Misuse16 />
  }
  if (isDirectory && size === 0) {
    label = 'excellent'
    color = 'green'
    icon = <CheckmarkFilled16 />
    displayHealth = 1
  }
  return {
    label: label + ' health',
    color,
    icon,
    displayHealth,
  }
}
