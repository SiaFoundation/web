import { Text } from '../core/Text'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'

export type TransactionData = {
  address: string
  siacoin: BigNumber
}

type Step = {
  id: string
  label: string
}

type Props = {
  activeStep: string
  steps: Step[]
  onChange: (step: string) => void
}

export function ProgressSteps({ activeStep, steps, onChange }: Props) {
  const activeIndex = steps.findIndex((s) => s.id === activeStep)
  const lastIndex = steps.length - 1
  return (
    <div className="relative w-full mt-8 mb-3">
      <div className="absolute w-full h-1 bg-gray-500 dark:bg-graydark-500 rounded-lg" />
      <div
        className="absolute h-1 bg-accent-800 dark:bg-accentdark-800 rounded-lg"
        style={{
          width: `${(activeIndex / lastIndex) * 100}%`,
        }}
      />
      {steps.map(({ id, label }, i) => {
        const isActive = activeStep === id
        const isActiveOrPrev = activeIndex >= i
        const isLast = i === lastIndex
        const isFirst = i === 0
        const isBacktrackable = isActiveOrPrev && activeIndex !== lastIndex
        return (
          <div
            key={id}
            className={cx(
              'absolute h-2 w-2 -top-0.5',
              isBacktrackable ? 'cursor-pointer' : 'cursor-default',
            )}
            style={{
              left: `calc(${(i / lastIndex) * 100}% - ${
                isLast ? 8 : isFirst ? 0 : 4
              }px)`,
            }}
            onClick={() => {
              if (isBacktrackable) {
                onChange(id)
              }
            }}
          >
            <Text
              color={isActive ? 'contrast' : 'verySubtle'}
              className={cx(
                'absolute top-[-30px]',
                isFirst ? 'left-0' : '',
                isLast ? 'right-0' : '',
                !isFirst && !isLast ? '-translate-x-1/2' : '',
              )}
              noWrap
            >
              {label}
            </Text>
            <div
              className={cx(
                'absolute left-0 top-0 h-full w-full rounded-lg border',
                isActiveOrPrev
                  ? 'bg-accent-800 dark-accentdark-800'
                  : 'bg-gray-500 dark:bg-graydark-500',
                isActiveOrPrev
                  ? 'border-accent-900 dark:border-accentdark-900'
                  : 'border-gray-600 dark:border-graydark-600',
              )}
            />
            {isActive && (
              <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-accent-800 dark:bg-accentdark-800 animate-pingslow" />
            )}
          </div>
        )
      })}
    </div>
  )
}
