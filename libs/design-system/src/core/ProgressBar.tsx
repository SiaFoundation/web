import React from 'react'
import { styled, keyframes, CSS, VariantProps } from '../config/theme'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { Flex } from './Flex'
import { Text } from './Text'

const indeterminateProgress = keyframes({
  '0%': {
    transform: 'scaleX(1) translateX(-100%)',
    transformOrigin: 'left',
  },
  '50%': {
    transform: 'scaleX(1) translateX(1000%)',
    transformOrigin: 'left',
  },
  '100%': {
    transform: 'scaleX(1) translateX(2000%)',
    transformOrigin: 'left',
  },
})

const StyledProgressBar = styled(ProgressPrimitive.Root, {
  boxSizing: 'border-box',
  position: 'relative',
  height: '$0-5',
  width: '100%',
  overflow: 'hidden',
  borderRadius: '$pill',

  '&[data-state="indeterminate"]': {
    backgroundColor: '$brandGray4',
    '&::after': {
      animationName: indeterminateProgress,
      animationDuration: '1500ms',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
      backgroundColor: '$brandGray7',
      boxSizing: 'border-box',
      borderRadius: '$pill',
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '5%',
    },
  },

  variants: {
    variant: {
      gray: {
        background: '$brandGray8',
      },
      accent: {
        backgroundColor: '$brandAccent9',
      },
      gradient: {
        // backgroundImage:
        //   'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
        backgroundImage:
          'linear-gradient(90deg, rgba(131,58,180,1) 0%, $brandAccent9 50%, rgba(252,176,69,1) 100%)',
      },
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
})

const ProgressBarIndicator = styled(ProgressPrimitive.Indicator, {
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '$brandGray4',
  transition: 'transform 150ms cubic-bezier(0.65, 0, 0.35, 1)',
})

type ProgressBarVariants = VariantProps<typeof StyledProgressBar>
type ProgressBarPrimitiveProps = React.ComponentProps<
  typeof ProgressPrimitive.Root
>
type ProgressBarProps = ProgressBarPrimitiveProps &
  ProgressBarVariants & { css?: CSS; label?: string }

export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof StyledProgressBar>,
  ProgressBarProps
>(({ label, value, max = 100, ...props }, forwardedRef) => {
  const percentage = value != null ? Math.round((value / max) * 100) : null

  return (
    <Flex direction="column" gap="0-5" css={{ width: '100%' }}>
      <StyledProgressBar {...props} ref={forwardedRef} value={value} max={max}>
        <ProgressBarIndicator
          style={{ transform: `translateX(${percentage}%)` }}
        />
      </StyledProgressBar>
      {label && (
        <Text color="subtle" size="12" ellipsis>
          {label}
        </Text>
      )}
    </Flex>
  )
})
