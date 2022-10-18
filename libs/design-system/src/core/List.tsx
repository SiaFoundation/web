/* eslint-disable react/jsx-pascal-case */
import { Flex } from './Flex'
import { Text } from './Text'
import {
  DotMark16,
  Number_132,
  Number_232,
  Number_332,
  Number_432,
  Number_532,
  Number_632,
  Number_732,
} from '../icons'
import React, { useMemo } from 'react'
import { CSS } from '../config/theme'
import { Paragraph } from './Paragraph'
import { Box } from './Box'

type Props = {
  children: React.ReactNode
  gap?: React.ComponentProps<typeof Flex>['gap']
  css?: CSS
}

export function Ol({ children, gap = '2', css }: Props) {
  return (
    <Flex as="ol" direction="column" gap={gap} css={{ padding: 0, ...css }}>
      {children}
    </Flex>
  )
}
export function Ul({ children, gap = '2', css }: Props) {
  return (
    <Flex as="ul" direction="column" gap={gap} css={{ padding: 0, ...css }}>
      {children}
    </Flex>
  )
}

const numMap: Record<number, React.ReactNode> = {
  1: <Number_132 />,
  2: <Number_232 />,
  3: <Number_332 />,
  4: <Number_432 />,
  5: <Number_532 />,
  6: <Number_632 />,
  7: <Number_732 />,
}

type LiProps = {
  children: React.ReactNode
  subList?: React.ReactNode
  css?: CSS
  index?: number
  size?: React.ComponentProps<typeof Paragraph>['size']
}

export function Li({
  children,
  index = 0,
  size = '18',
  subList,
  css,
}: LiProps) {
  const numEl = numMap[index]

  const posCss: CSS = useMemo(
    () =>
      numEl
        ? ({
            // Mobile paragraph scaling
            top: Number(size) < 18 ? '-5px' : '-3px',
            // Full paragraph scaling
            '@bp2': {
              top: Number(size) < 18 ? '-3px' : '0px',
            },
          } as CSS)
        : ({
            // Mobile paragraph scaling
            top: Number(size) < 18 ? '-4px' : '-2px',
            // Full paragraph scaling
            '@bp2': {
              top: Number(size) < 18 ? '-2px' : '0px',
            },
          } as CSS),
    [numEl, size]
  )

  return (
    <Flex as="li" align="start" gap="1" css={{ ...css }}>
      <Flex
        css={{
          position: 'relative',
          ...posCss,
          width: '24px',
          height: '32px',
        }}
      >
        <Flex
          css={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          align="center"
          justify="center"
        >
          <Text color="contrast">{numEl || <DotMark16 />}</Text>
        </Flex>
      </Flex>
      <Box css={{ flex: 1 }}>
        <Paragraph color="contrast" size={size}>
          {children}
        </Paragraph>
        {subList}
      </Box>
    </Flex>
  )
}
