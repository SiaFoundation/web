import { Code } from '../core/Code'
import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { Information16 } from '../icons/carbon'

type Props = {
  label: string
  link?: string
  tip: React.ReactNode
  value: string
  onChange: (value: string) => void
}

export function ConfigurationTipText({
  label,
  link,
  tip,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <Tooltip align="start" content={tip}>
        <div className="flex gap-1 items-center relative top-px">
          <Text className="flex relative -top-px">
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
      <div className="flex cursor-pointer" onClick={() => onChange(value)}>
        <Text size="12">
          <Code>{value}</Code>
        </Text>
      </div>
    </div>
  )
}
