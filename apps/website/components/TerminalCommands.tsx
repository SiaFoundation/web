import {
  Flex,
  Box,
  Paragraph,
  ScrollArea,
  CSS,
} from '@siafoundation/design-system'
import { useEffect, useRef, useMemo } from 'react'
import Typed from 'typed.js'

type Command = {
  command: string[]
  result: string[]
}

type Sequence = Command[]

type Props = { sequences: Sequence[]; wrap?: boolean; css?: CSS }

export function TerminalCommands({ sequences, wrap, css }: Props) {
  const strings = useMemo(
    () =>
      sequences.map((s) =>
        s
          .map(
            (c) =>
              '<span style="color:green">~ </span>' +
              '<span style="color:white">' +
              c.command.join('\n') +
              '</span>^500\n' +
              c.result.map((line) => `\`${line}\`\n`).join('')
          )
          .join('')
      ),
    [sequences]
  )

  const scrollEl = useRef<HTMLDivElement>(null)
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings,
      backDelay: 5000,
      typeSpeed: 20,
      fadeOut: true,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [strings])

  useEffect(() => {
    const i = setInterval(() => {
      scrollEl.current.scrollTo({
        top: scrollEl.current.scrollHeight,
      })
    }, 200)
    return () => {
      clearInterval(i)
    }
  }, [])

  return (
    <Flex
      direction="column"
      gap="1"
      css={{
        backgroundColor: '#151718',
        borderRadius: '$2',
        height: '300px',
        pt: '$1-5',
        overflow: 'hidden',
        width: '100%',
        ...css,
      }}
    >
      <Flex
        gap="1"
        css={{
          px: '$1-5',
        }}
      >
        <Box
          css={{
            width: '$1',
            height: '$1',
            borderRadius: '$round',
            backgroundColor: 'red',
          }}
        />
        <Box
          css={{
            width: '$1',
            height: '$1',
            borderRadius: '$round',
            backgroundColor: 'orange',
          }}
        />
        <Box
          css={{
            width: '$1',
            height: '$1',
            borderRadius: '$round',
            backgroundColor: 'lightgreen',
          }}
        />
      </Flex>
      <ScrollArea ref={scrollEl}>
        <Flex
          css={{
            px: '$1-5',
          }}
        >
          <Box as="pre" css={wrap ? { whiteSpace: 'pre-wrap' } : {}}>
            <Paragraph size="14" ref={el} font="mono" css={{ color: 'gray' }} />
          </Box>
        </Flex>
      </ScrollArea>
    </Flex>
  )
}
