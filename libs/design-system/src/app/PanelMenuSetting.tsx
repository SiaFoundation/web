import { Heading } from '../core/Heading'
import { Paragraph } from '../core/Paragraph'

type Props = {
  title: string
  description: React.ReactNode
  control?: React.ReactNode
}

export function PanelMenuSetting({ title, description, control }: Props) {
  return (
    <div className="flex gap-10 justify-between">
      <div className="flex flex-col gap-2 max-w-[600px]">
        <Heading size="20">{title}</Heading>
        <Paragraph size="14">{description}</Paragraph>
      </div>
      <div className="">{control}</div>
    </div>
  )
}
