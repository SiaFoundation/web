import { Button } from '../core/Button'
import { Codeblock } from '../core/Codeblock'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../core/DropdownMenu'
import { Flex } from '../core/Flex'
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
    <Panel css={{ padding: '$3' }}>
      <Flex direction="column" gap="3">
        <Flex gap="3" justify="between" align="center">
          <Heading size="20" font="mono">
            {title}
          </Heading>
          {actions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <OverflowMenuHorizontal16 />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actions.map(({ title, onClick }) => (
                  <DropdownMenuItem key={title} onSelect={onClick}>
                    {title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </Flex>
        <Codeblock>{JSON.stringify(data, null, ' ')}</Codeblock>
      </Flex>
    </Panel>
  )
}
