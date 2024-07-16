import { Button, ScrollArea, Text, Tooltip } from '@siafoundation/design-system'
import {
  useAppSettings,
  usePrefersReducedMotion,
} from '@siafoundation/react-core'
import { Wikis16 } from '@siafoundation/react-icons'
import { random, throttle } from '@technically/lodash'
import axios from 'axios'
import { cx } from 'class-variance-authority'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'
import type { SiaCentralPartialHost } from '../../content/geoHosts'
import type { Stats } from '../../content/stats'
import { Globe } from './Globe'
import { HostItem } from './HostItem'

type Props = {
  hosts: SiaCentralPartialHost[]

  rates: {
    usd: string
  }
  className?: string
}

export function HostMap({ className, hosts, rates }: Props) {
  const { data } = useSWR<Stats>('/api/stats', (key) =>
    axios.get(key).then((res) => res.data),
  )
  const { activeHosts, totalStorage } = data || {}

  const scrollRef = useRef<HTMLDivElement>()
  const refs = useRef<HTMLDivElement[]>([]) // to store refs for all items

  const [activeIndex, setActiveIndex] = useState<number>(
    random(0, hosts.length - 1),
  )
  const activeHost = useMemo(() => hosts[activeIndex], [hosts, activeIndex])
  const [reset, setReset] = useState<string>()
  const selectActiveHostByIndex = useCallback(
    (i: number) => {
      setActiveIndex(i)
      setReset(String(Math.random()))
    },
    [setActiveIndex, setReset],
  )

  const selectActiveHost = useCallback(
    (publicKey: string) => {
      const index = hosts.findIndex((h) => h.public_key === publicKey)
      setActiveIndex(index)
      setReset(String(Math.random()))
    },
    [hosts],
  )

  const selectNextHost = useCallback(() => {
    if (hosts.length) {
      const nextIndex = activeIndex === hosts.length - 1 ? 0 : activeIndex + 1
      selectActiveHostByIndex(nextIndex)
    }
  }, [selectActiveHostByIndex, activeIndex, hosts])

  const { gpu } = useAppSettings()

  const isGlobeActive = gpu.shouldRender

  const reduceMotion = usePrefersReducedMotion()
  const [isInteracting, setIsInteracting] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isInteracting) {
      return
    }
    if (reduceMotion && !isGlobeActive) {
      return
    }
    const i = setInterval(() => selectNextHost(), 6_000)
    return () => {
      clearInterval(i)
    }
  }, [reset, selectNextHost, reduceMotion, isGlobeActive, isInteracting])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (hosts.length) {
      selectActiveHostByIndex(0)
    }
  }, [hosts])

  useEffect(() => {
    if (activeIndex !== null && refs.current[activeIndex]) {
      const scrollContainer = scrollRef.current
      const selectedElement = refs.current[activeIndex]

      if (!scrollContainer || !selectedElement) {
        return
      }

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

  const [interactionTimer, setInteractionTimer] = useState<string>()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const t = setTimeout(() => {
      setIsInteracting(false)
    }, 3000)
    return () => {
      clearTimeout(t)
    }
  }, [interactionTimer])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onMouseMove = useMemo(
    () =>
      throttle(() => {
        setIsInteracting(true)
        setInteractionTimer(String(Math.random()))
      }, 1000),
    [setIsInteracting, setInteractionTimer],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onMouseLeave = useMemo(
    () =>
      throttle(() => {
        setIsInteracting(false)
      }, 1000),
    [setIsInteracting],
  )

  return (
    <div className={className}>
      <div
        onMouseMove={gpu.shouldRender ? onMouseMove : undefined}
        onMouseLeave={gpu.shouldRender ? onMouseLeave : undefined}
        className={cx(
          'relative border-b border-gray-400 dark:border-graydark-400 w-full',
          gpu.hasCheckedGpu && !gpu.shouldRender
            ? 'h-[50px] md:h-[200px]'
            : 'aspect-[2/1]',
          'transition-all duration-[400ms]',
        )}
      >
        <div
          className={cx(
            'relative w-full h-full overflow-hidden',
            gpu.shouldRender || !gpu.hasCheckedGpu
              ? '-mt-[50px] md:-mt-[80px]'
              : '',
            gpu.hasCheckedGpu && gpu.shouldRender ? 'opacity-1' : 'opacity-0',
            'transition-opacity duration-[400ms]',
          )}
        >
          {gpu.hasCheckedGpu && gpu.shouldRender && (
            <Globe
              activeHost={activeHost}
              hosts={hosts}
              rates={rates}
              selectActiveHost={selectActiveHost}
            />
          )}
        </div>
      </div>
      <div className="flex gap-0 md:gap-3 items-center">
        <div className="flex items-center py-1">
          {activeHosts && (
            <Tooltip
              align="start"
              content={
                gpu.canGpuRender
                  ? gpu.isGpuEnabled
                    ? 'Interactive host map is currently enabled.'
                    : 'Interactive host map is currently disabled.'
                  : 'Browser does not support interactive host map.'
              }
            >
              <Button
                variant="ghost"
                icon="hover"
                className="-ml-4 md:-ml-2"
                onClick={
                  gpu.canGpuRender
                    ? () => gpu.setIsGpuEnabled(!gpu.isGpuEnabled)
                    : undefined
                }
              >
                <Wikis16 />
              </Button>
            </Tooltip>
          )}
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
                className="hidden md:flex py-1.5"
              >
                {activeHosts} hosts
              </Text>
            </Tooltip>
          )}
        </div>
        <ScrollArea ref={scrollRef} className="-mr-4 md:mr-0">
          <div className="flex-1 flex p-1">
            {hosts.map((h, i) => (
              <HostItem
                key={h.public_key}
                host={h}
                activeHost={activeHost}
                selectActiveHost={selectActiveHost}
                rates={rates}
                setRef={(ref) => (refs.current[i] = ref)}
              />
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
              className="hidden md:flex py-1.5"
            >
              {totalStorage}
            </Text>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
