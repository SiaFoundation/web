import {
  Button,
  copyToClipboard,
  Panel,
  Paragraph,
} from '@siafoundation/design-system'
import { useCallback } from 'react'

type Props = {
  children: React.ReactNode
  icon: React.ReactNode
  description: React.ReactNode
  seed: string
}

export function SeedLayout({ children, icon, description, seed }: Props) {
  const copySeed = useCallback(() => {
    copyToClipboard(seed, 'seed')
  }, [seed])

  return (
    <div className="">
      <Panel className="mb-6">
        <div className="flex gap-6 items-center py-4 px-8">
          <div className="">{icon}</div>
          <div className="flex flex-col gap-2">
            <Paragraph size="14">{description}</Paragraph>
            <div className="">
              <Button onClick={copySeed}>Copy Seed to Clipboard</Button>
            </div>
          </div>
        </div>
      </Panel>
      {children}
    </div>
  )
}
