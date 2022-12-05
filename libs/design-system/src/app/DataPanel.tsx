import { Button } from '../core/Button'
import { Codeblock } from '../core/Codeblock'
import { DropdownMenu, DropdownMenuItem } from '../core/DropdownMenu'
import { Heading } from '../core/Heading'
import { Panel } from '../core/Panel'
import { OverflowMenuHorizontal16 } from '../icons/carbon'

type Action = {
  title: string
  onClick: () => void
}

type Props = {
  actions?: Action[]
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

export function DataPanel({ title, data, actions }: Props) {
  return (
    <Panel className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-center justify-between">
          <Heading size="20" font="mono">
            {title}
          </Heading>
          {actions && (
            <DropdownMenu
              trigger={
                <Button>
                  <OverflowMenuHorizontal16 />
                </Button>
              }
              contentProps={{
                align: 'end',
              }}
            >
              {actions.map(({ title, onClick }) => (
                <DropdownMenuItem key={title} onSelect={onClick}>
                  {title}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          )}
        </div>
        <Codeblock>{JSON.stringify(data, null, ' ')}</Codeblock>
      </div>
    </Panel>
  )
}
