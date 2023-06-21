import { Button, Panel, Paragraph } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
  icon: React.ReactNode
  description: React.ReactNode
  copySeed?: () => void
}

export function SeedLayout({ copySeed, children, icon, description }: Props) {
  return (
    <div className="">
      <Panel className="mb-6">
        <div className="flex gap-6 items-center py-4 px-4">
          <div className="flex">{icon}</div>
          <div className="flex flex-col gap-2">
            <Paragraph size="14">{description}</Paragraph>
            {copySeed && (
              <Button onClick={copySeed}>Copy Seed to Clipboard</Button>
            )}
          </div>
        </div>
      </Panel>
      {children}
    </div>
  )
}
