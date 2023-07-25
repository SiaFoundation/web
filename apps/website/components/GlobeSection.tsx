import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  monthsToBlocks,
  ScrollArea,
  TBToBytes,
  Text,
  Tooltip,
  userPrefersReducedMotion,
} from '@siafoundation/design-system'
import { Globe } from './Globe'
import { humanBytes, humanSiacoin, humanSpeed } from '@siafoundation/sia-js'
import countryCodeEmoji from '../lib/countryEmoji'
import { cx } from 'class-variance-authority'
import { useElementSize } from 'usehooks-ts'
import { SiaCentralHost } from '@siafoundation/data-sources'
import axios from 'axios'
import { Stats } from '../content/stats'
import useSWR from 'swr'
import { Marker } from 'cobe'
import BigNumber from 'bignumber.js'
import { useGlobeSettings } from '../hooks/useGlobeSettings'

type Props = {
  hosts: SiaCentralHost[]
  rates: {
    usd: string
  }
  className?: string
}

export function GlobeSection({ className, hosts, rates }: Props) {
  const { data } = useSWR<Stats>('/api/stats', (key) =>
    axios.get(key).then((res) => res.data)
  )
  const { activeHosts, totalStorage } = data || {}

  const scrollRef = useRef<HTMLDivElement>()
  const refs = useRef([]) // to store refs for all items

  const focus = useRef<[number, number]>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const activeHost = useMemo(() => hosts[activeIndex], [hosts, activeIndex])
  const selectActiveHostByIndex = useCallback(
    (i: number) => {
      setActiveIndex(i)
      const h = hosts[i]
      focus.current = locationToAngles(h.location[0], h.location[1])
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

  const [errorRendering, setErrorRendering] = useState(false)
  const { shouldRender } = useGlobeSettings()

  const isGlobeActive = shouldRender && !errorRendering

  const reduceMotion = userPrefersReducedMotion()
  useEffect(() => {
    if (reduceMotion && !isGlobeActive) {
      return
    }
    const i = setInterval(() => selectNextHost(), 6_000)
    return () => {
      clearInterval(i)
    }
  }, [reset, selectNextHost, reduceMotion, isGlobeActive])

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

  const markers: Marker[] = useMemo(
    () =>
      hosts.map((c) => ({
        location: [c.location[0], c.location[1]],
        size: activeHost.public_key === c.public_key ? 0.05 : 0.02,
      })),
    [hosts, activeHost]
  )

  const getStorageCost = useCallback(
    (h: SiaCentralHost) =>
      rates
        ? `$${new BigNumber(h.settings.storage_price)
            .times(TBToBytes(1))
            .times(monthsToBlocks(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(h.settings.storage_price)
              .times(TBToBytes(1))
              .times(monthsToBlocks(1)),
            { fixed: 0 }
          )}/TB`,
    [rates]
  )

  const getDownloadCost = useCallback(
    (h: SiaCentralHost) =>
      rates
        ? `$${new BigNumber(h.settings.download_price)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(h.settings.download_price).times(TBToBytes(1)),
            { fixed: 0 }
          )}/TB`,
    [rates]
  )

  const getUploadCost = useCallback(
    (h: SiaCentralHost) =>
      rates
        ? `$${new BigNumber(h.settings.upload_price)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(h.settings.upload_price).times(TBToBytes(1)),
            { fixed: 0 }
          )}/TB`,
    [rates]
  )

  return (
    <div ref={containerRef} className={className}>
      {isGlobeActive ? (
        <div className="relative border-b border-gray-400 dark:border-graydark-400 pointer-events-none">
          <div
            className="relative w-full overflow-hidden aspect-square"
            style={{
              height: `${width * 0.7}px`,
              marginTop: mt,
            }}
          >
            <Globe
              focus={focus}
              markers={markers}
              onError={() => setErrorRendering(true)}
            />
          </div>
        </div>
      ) : (
        <div className="h-[50px] md:h-[200px]" />
      )}
      <div className="flex gap-4 overflow-hidden">
        {activeHosts && (
          <Tooltip
            align="start"
            content={
              isGlobeActive
                ? 'The map features a random sample of active hosts.'
                : 'The list is a random sample of active hosts.'
            }
          >
            <Text
              size="12"
              weight="medium"
              noWrap
              className="hidden md:flex pt-2 pb-3"
            >
              {activeHosts} hosts
            </Text>
          </Tooltip>
        )}
        <ScrollArea ref={scrollRef}>
          <div className="flex-1 flex gap-4 pt-2 pb-3">
            {hosts.map((h, i) => (
              <Tooltip
                content={
                  <div className="flex flex-col gap-1">
                    <Text color="contrast" weight="bold">
                      {countryCodeEmoji(h.country_code)} {h.country_code}
                    </Text>
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <Text color="subtle">storage</Text>
                        <Text color="subtle">download</Text>
                        <Text color="subtle">upload</Text>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Text color="contrast">
                          {humanBytes(h.settings.total_storage)}
                        </Text>
                        <Text color="contrast">
                          {humanSpeed(
                            (h.benchmark.data_size * 8) /
                              (h.benchmark.download_time / 1000)
                          )}{' '}
                        </Text>
                        <Text color="contrast">
                          {humanSpeed(
                            (h.benchmark.data_size * 8) /
                              (h.benchmark.upload_time / 1000)
                          )}{' '}
                        </Text>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Text color="contrast">{getStorageCost(h)}</Text>
                        <Text color="contrast">{getDownloadCost(h)}</Text>
                        <Text color="contrast">{getUploadCost(h)}</Text>
                      </div>
                    </div>
                  </div>
                }
                key={h.public_key}
              >
                <div
                  ref={(el) => (refs.current[i] = el)}
                  onClick={() => {
                    selectActiveHostByIndex(i)
                    setReset(String(Math.random()))
                  }}
                  className={cx(
                    'flex gap-1',
                    h.public_key === activeHost?.public_key
                      ? 'opacity-100'
                      : 'opacity-50',
                    'hover:opacity-100',
                    'cursor-pointer'
                  )}
                >
                  <Text size="12" noWrap>
                    {countryCodeEmoji(h.country_code)}
                  </Text>
                  <Text
                    color="contrast"
                    size="12"
                    className="text-white"
                    noWrap
                    weight={
                      h.public_key === activeHost?.public_key
                        ? 'semibold'
                        : 'regular'
                    }
                  >
                    {humanBytes(h.settings.total_storage)} ·{' '}
                    {humanSpeed(
                      (h.benchmark.data_size * 8) /
                        (h.benchmark.download_time / 1000)
                    )}{' '}
                    · {getStorageCost(h)}
                  </Text>
                </div>
              </Tooltip>
            ))}
          </div>
        </ScrollArea>
        {totalStorage && (
          <Tooltip
            align="end"
            content="The total amount of storage space available from hosts."
          >
            <Text
              size="12"
              weight="medium"
              noWrap
              className="hidden md:flex pt-2 pb-3"
            >
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
