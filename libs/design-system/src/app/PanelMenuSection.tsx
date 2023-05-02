import { Heading } from '../core/Heading'
import { Panel } from '../core/Panel'

type Props = {
  title?: string
  children: React.ReactNode
}

export function PanelMenuSection({ title, children }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {title && (
        <Heading anchorLink size="24">
          {title}
        </Heading>
      )}
      <Panel className="p-6">
        <div className="flex flex-col gap-6">{children}</div>
      </Panel>
    </div>
  )
}
