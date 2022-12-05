import { Paragraph, ScrollArea } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import { useEffect, useRef, useMemo } from 'react'
import Typed from 'typed.js'

type Command = {
  command: string[]
  result: string[]
}

type Sequence = Command[]

type Props = { sequences: Sequence[]; wrap?: boolean; className?: string }

export function Terminal({ sequences, wrap, className }: Props) {
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
    <div
      onMouseEnter={() => (focusRef.current.mouseOver = true)}
      onMouseLeave={() => (focusRef.current.mouseOver = false)}
      className={cx(
        'flex flex-col gap-2',
        'bg-[#151718]',
        'border border-gray-200 dark:border-graydark-200',
        'rounded-lg',
        'h-[300px]',
        'pt-3',
        'overflow-hidden',
        'w-[500px] max-w-full',
        className
      )}
    >
      <div className="flex gap-2 px-3">
        <div className="w-2 h-2 rounded bg-red-400" />
        <div className="w-2 h-2 rounded bg-yellow-400" />
        <div className="w-2 h-2 rounded bg-green-400" />
      </div>
      <ScrollArea ref={scrollEl}>
        <div className="flex px-3">
          <pre className={wrap ? 'whitespace-pre-wrap' : ''}>
            <Paragraph size="14" ref={el} font="mono" className="" />
          </pre>
        </div>
      </ScrollArea>
    </div>
  )
}
