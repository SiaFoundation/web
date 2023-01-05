import { Paragraph, Text } from '@siafoundation/design-system'

type Props = {
  title: string
  description: React.ReactNode
  suggestion?: React.ReactNode
  control?: React.ReactNode
}

export function Setting({ title, description, suggestion, control }: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 max-w-screen-md">
        <Text size="20" weight="semibold">
          {title}
        </Text>
        <Paragraph size="14">{description}</Paragraph>
        {suggestion && <Text color="accent">Suggestion: {suggestion}</Text>}
      </div>
      <div className="">{control}</div>
    </div>
  )
}
