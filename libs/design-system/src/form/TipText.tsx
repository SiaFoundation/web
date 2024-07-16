import { Information16 } from '@siafoundation/react-icons'
import { Code } from '../core/Code'
import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'

type Props = {
  label: string
  link?: string
  tip: React.ReactNode
  value: string
  onClick: () => void
}

export function TipText({ label, link, tip, value, onClick }: Props) {
  return (
    <div className="flex justify-between items-center">
      <Tooltip align="start" side="bottom" content={tip}>
        <div className="flex gap-1 items-center relative overflow-hidden">
          <Text className="flex relative">
            <Information16 />
          </Text>
          <Text size="12">
            {link ? (
              <Link href={link} target="_blank">
                {label}
              </Link>
            ) : (
              label
            )}
          </Text>
        </div>
      </Tooltip>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        className="flex cursor-pointer items-center"
        onClick={onClick}
      >
        <Text size="12">
          <Code>{value}</Code>
        </Text>
      </div>
    </div>
  )
}
