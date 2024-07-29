import { Code } from '../core/Code'
import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { Information16 } from '@siafoundation/react-icons'

type Props = {
  label: string
  link?: string
  tip: React.ReactNode
  value: string
  onClick: () => void
}

export function TipText({ label, link, tip, value, onClick }: Props) {
  return (
    <div className="flex justify-between gap-1 items-center overflow-hidden">
      <div>
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
      </div>
      <div className="overflow-hidden">
        <Text
          role="button"
          tabIndex={0}
          aria-label={label}
          className="flex cursor-pointer items-center"
          onClick={onClick}
          size="12"
        >
          <Code ellipsis className="block">
            {value}
          </Code>
        </Text>
      </div>
    </div>
  )
}
