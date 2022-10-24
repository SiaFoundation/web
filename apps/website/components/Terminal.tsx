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

export function Terminal({ sequences, wrap, css }: Props) {
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
      typeSpeed: 10,
      fadeOut: true,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [strings])

  const focusRef = useRef<{ mouseOver: boolean }>({ mouseOver: false })
  useEffect(() => {
    const i = setInterval(() => {
      if (focusRef.current.mouseOver) {
        return
      }
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
      onMouseEnter={() => (focusRef.current.mouseOver = true)}
      onMouseLeave={() => (focusRef.current.mouseOver = false)}
      css={{
        backgroundColor: '#151718',
        border: '1px solid $slate3',
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
