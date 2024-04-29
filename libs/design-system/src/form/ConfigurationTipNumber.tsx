import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { ValueSc } from '../components/ValueSc'
import { ValueNum } from '../components/ValueNum'
import { Information16 } from '@siafoundation/react-icons'
import { toFixedMax } from '../lib/numbers'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'

type Props = {
  type: 'siacoin' | 'number'
  label: string
  link?: string
  icon?: React.ReactNode
  tip: React.ReactNode
  value: BigNumber // number | hastings
  onClick?: (value: BigNumber) => void
  decimalsLimit: number
  units?: string
}

export function ConfigurationTipNumber({
  type,
  label,
  link,
  tip,
  icon,
  value,
  onClick,
  decimalsLimit,
  units,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <Tooltip align="start" side="bottom" content={tip}>
        <div className="flex gap-1 items-center relative overflow-hidden">
          <Text className="flex relative">{icon || <Information16 />}</Text>
          <Text size="12" ellipsis>
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
        className={cx('flex items-center', onClick ? 'cursor-pointer' : '')}
        onClick={() => {
          if (onClick) {
            onClick(value)
          }
        }}
      >
        {type === 'siacoin' ? (
          <ValueSc
            value={value}
            variant="value"
            size="12"
            fixed={decimalsLimit}
            dynamicUnits={false}
            showTooltip={false}
            tipSide="bottom"
          />
        ) : (
          <ValueNum
            value={value}
            variant="value"
            size="12"
            format={(val) => `${toFixedMax(val, decimalsLimit)} ${units}`}
            tipSide="bottom"
          />
        )}
      </div>
    </div>
  )
}
