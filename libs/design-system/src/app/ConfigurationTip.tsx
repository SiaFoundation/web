import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { ValueSc } from '../components/ValueSc'
import { ValueNum } from '../components/ValueNum'
import { Information16 } from '../icons/carbon'
import { toFixedMax } from '../lib/numbers'
import BigNumber from 'bignumber.js'

type Props = {
  type: 'siacoin' | 'number'
  label: string
  link?: string
  tip: string
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimit: number
  units?: string
}

export function ConfigurationTip({
  type,
  label,
  link,
  tip,
  value,
  onChange,
  decimalsLimit,
  units,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <Tooltip align="start" content={tip}>
        <div className="flex gap-1 items-center relative top-px">
          <div className="flex relative -top-px">
            <Information16 />
          </div>
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
        {type === 'siacoin' ? (
          <ValueSc
            value={value}
            variant="value"
            size="12"
            fixed={decimalsLimit}
            dynamicUnits={false}
            showTooltip={false}
          />
        ) : (
          <ValueNum
            value={value}
            variant="value"
            size="12"
            format={(val) => `${toFixedMax(val, decimalsLimit)} ${units}`}
          />
        )}
      </div>
    </div>
  )
}
