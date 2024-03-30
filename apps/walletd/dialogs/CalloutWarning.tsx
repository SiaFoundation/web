import { Alert, Text } from '@siafoundation/design-system'
import { Warning16 } from '@carbon/icons-react'

type Props = {
  label: string
  description: React.ReactNode
}

export function CalloutWarning({ label, description }: Props) {
  return (
    <Alert className="!p-2">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <Text>
            <Warning16 />
          </Text>
          <Text weight="medium">{label}</Text>
        </div>
        <Text size="14" color="subtle">
          {description}
        </Text>
      </div>
    </Alert>
  )
}
