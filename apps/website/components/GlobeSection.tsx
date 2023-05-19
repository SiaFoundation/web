import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollArea, Text, Tooltip } from '@siafoundation/design-system'
import { Globe } from './Globe'
import { humanBytes } from '@siafoundation/sia-js'
import countryCodeEmoji from '../lib/countryEmoji'
import { cx } from 'class-variance-authority'
import { useElementSize } from 'usehooks-ts'
import { SiaStatsHostCoordinate } from '@siafoundation/data-sources'
import axios from 'axios'
import { Stats } from '../content/stats'
import useSWR from 'swr'

type Props = {
  hosts: SiaStatsHostCoordinate[]
  className?: string
}

export function GlobeSection({ className, hosts }: Props) {
  const { data } = useSWR<Stats>('/api/stats', (key) =>
    axios.get(key).then((res) => res.data)
  )
  const { onlineHosts, totalStorage } = data || {}

  const markers = useMemo(
    () =>
      hosts.map((c) => ({
        location: [c.lat, c.lon],
        size: 0.03, // c.totalstorage / 1000000,
      })),
    [hosts]
  )

  const scrollRef = useRef<HTMLDivElement>()
  const refs = useRef([]) // to store refs for all items

  const focus = useRef<[number, number]>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const activeHost = useMemo(() => hosts[activeIndex], [hosts, activeIndex])
  const selectActiveHostByIndex = useCallback(
    (i: number) => {
      setActiveIndex(i)
      const h = hosts[i]
      focus.current = locationToAngles(h.lat, h.lon)
    },
    [focus, hosts, setActiveIndex]
  )

  const selectNextHost = useCallback(() => {
    if (hosts.length) {
      const nextIndex = activeIndex === hosts.length - 1 ? 0 : activeIndex + 1
      selectActiveHostByIndex(nextIndex)
    }
  }, [selectActiveHostByIndex, activeIndex, hosts])

  const [reset, setReset] = useState<string>()
  useEffect(() => {
    const i = setInterval(() => selectNextHost(), 6_000)
    return () => {
      clearInterval(i)
    }
  }, [reset, selectNextHost])

  useEffect(() => {
    if (hosts.length) {
      selectActiveHostByIndex(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hosts])

  useEffect(() => {
    if (activeIndex !== null && refs.current[activeIndex]) {
      const scrollContainer = scrollRef.current
      const selectedElement = refs.current[activeIndex]

      const containerWidth = scrollContainer.offsetWidth
      const selectedElementWidth = selectedElement.offsetWidth
      const selectedElementLeft = selectedElement.offsetLeft

      const scrollPosition =
        selectedElementLeft - containerWidth / 2 + selectedElementWidth / 2
      scrollContainer.scroll({
        left: scrollPosition,
        behavior: 'smooth',
      })
    }
  }, [activeIndex])

  const [containerRef, { width }] = useElementSize()

  const mt = useMemo(() => {
    let mt = '-100px'
    if (width > 640) {
      mt = '-120px'
    }
    if (width > 768) {
      mt = '-150px'
    }
    if (width > 1024) {
      mt = '-160px'
    }
    return mt
  }, [width])

  return (
    <div ref={containerRef} className={className}>
      <div className="relative border-b border-gray-400 dark:border-graydark-400 pointer-events-none">
        <div
          className="relative w-full overflow-hidden aspect-square"
          style={{
            height: `${width * 0.7}px`,
            marginTop: mt,
          }}
        >
          <Globe activeHost={activeHost} focus={focus} markers={markers} />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {onlineHosts && (
          <Tooltip
            align="start"
            content="The map features a random sample of active hosts."
          >
            <Text size="12" weight="medium" noWrap className="pt-2 pb-3">
              {onlineHosts} hosts
            </Text>
          </Tooltip>
        )}
        <ScrollArea ref={scrollRef}>
          <div className="flex-1 flex gap-4 pt-2 pb-3">
            {hosts.map((c, i) => (
              <div
                key={c.key}
                ref={(el) => (refs.current[i] = el)}
                onClick={() => {
                  selectActiveHostByIndex(i)
                  setReset(String(Math.random()))
                }}
                className={cx(
                  'flex gap-1',
                  c.key === activeHost?.key ? 'opacity-100' : 'opacity-50',
                  'hover:opacity-100',
                  'cursor-pointer'
                )}
              >
                <Text size="12" noWrap>
                  {countryCodeEmoji(c.country)}
                </Text>
                <Text
                  color="contrast"
                  size="12"
                  className="text-white"
                  noWrap
                  weight={c.key === activeHost?.key ? 'semibold' : 'regular'}
                >
                  {c.ip} · {humanBytes(c.totalstorage * Math.pow(1000, 3))}
                </Text>
              </div>
            ))}
          </div>
        </ScrollArea>
        {totalStorage && (
          <Tooltip
            align="end"
            content="The total amount of storage space available from hosts."
          >
            <Text size="12" weight="medium" noWrap className="pt-2 pb-3">
              {totalStorage}
            </Text>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

function locationToAngles(lat: number, long: number): [number, number] {
  return [
    Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ]
}
