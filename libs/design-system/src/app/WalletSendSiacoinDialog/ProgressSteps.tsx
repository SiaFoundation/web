import { Text, Box } from '../../core'
import { keyframes } from '../../config/theme'
import BigNumber from 'bignumber.js'

export type TransactionData = {
  address: string
  siacoin: BigNumber
}

const pulse = keyframes({
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
  },
  '100%': {
    transform: 'scale(2)',
    opacity: 0,
  },
})

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
    <Box
      css={{
        position: 'relative',
        width: '100%',
        marginTop: '30px',
        marginBottom: '10px',
      }}
    >
      <Box
        css={{
          position: 'absolute',
          width: '100%',
          height: '4px',
          backgroundColor: '$gray6',
          borderRadius: '$pill',
        }}
      />
      <Box
        css={{
          position: 'absolute',
          width: `${(activeIndex / lastIndex) * 100}%`,
          height: '4px',
          backgroundColor: '$accent9',
          borderRadius: '$pill',
        }}
      />
      {steps.map(({ id, label }, i) => {
        const isActive = activeStep === id
        const isActiveOrPrev = activeIndex >= i
        const isLast = i === lastIndex
        const isFirst = i === 0
        const isBacktrackable = isActiveOrPrev && activeIndex !== lastIndex
        return (
          <Box
            key={id}
            css={{
              position: 'absolute',
              left: `calc(${(i / lastIndex) * 100}% - ${
                isLast ? 8 : isFirst ? 0 : 4
              }px)`,
              height: '8px',
              width: '8px',
              top: '-2px',
              cursor: isBacktrackable ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (isBacktrackable) {
                onChange(id)
              }
            }}
          >
            <Text
              color={isActive ? 'contrast' : 'verySubtle'}
              css={{
                position: 'absolute',
                top: '-30px',
                left: isFirst ? 0 : undefined,
                right: isLast ? 0 : undefined,
                transform: !isFirst && !isLast ? 'translateX(-50%)' : undefined,
              }}
            >
              {label}
            </Text>
            <Box
              css={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                borderRadius: '$round',
                backgroundColor: isActiveOrPrev ? '$accent9' : '$gray6',
                border: isActiveOrPrev
                  ? '1px solid $accent10'
                  : '1px solid $gray7',
              }}
            />
            {isActive && (
              <Box
                css={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '100%',
                  borderRadius: '$round',
                  backgroundColor: '$accent9',
                  animation: `${pulse} 2s infinite`,
                  willChange: 'transform',
                }}
              />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

// <Box
//   css={{
//     position: 'absolute',
//     left: 'calc(50% - 3px)',
//     height: '6px',
//     width: '6px',
//     top: '-1px',
//     borderRadius: '$round',
//     backgroundColor: '$gray8',
//   }}
// />
// <Box
//   css={{
//     position: 'absolute',
//     right: 0,
//     height: '6px',
//     width: '6px',
//     top: '-1px',
//     borderRadius: '$round',
//     backgroundColor: '$gray8',
//   }}
// />
