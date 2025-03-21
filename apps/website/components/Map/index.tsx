import { useAppSettings } from '@siafoundation/react-core'
import { Globe } from './Globe'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ScrollArea, Text, Tooltip } from '@siafoundation/design-system'
import { HostItem } from './HostItem'
import { Navbar } from '../Layout/Navbar'
import { ExplorerPartialHost } from '../../content/geoHosts'
import { PageHead } from '../PageHead'
import { previews } from '../../content/assets'
import { Stats } from '../../content/stats'

export type Commands = {
  moveToLocation: (
    location: [number, number] | undefined,
    altitude?: number
  ) => void
}

export const emptyCommands: Commands = {
  moveToLocation: (location: [number, number], altitude?: number) => null,
}

type Props = {
  hosts: ExplorerPartialHost[]
  stats: Stats
}

export function Map({ hosts, stats }: Props) {
  const { gpu, settings } = useAppSettings()

  const [activeHostPublicKey, setActiveHostPublicKey] = useState<string>(
    hosts[0].publicKey
  )

  const activeHost = useMemo(
    () => hosts?.find((d) => d.publicKey === activeHostPublicKey),
    [hosts, activeHostPublicKey]
  )

  const cmdRef = useRef<Commands>(emptyCommands)

  const setCmd = useCallback(
    (cmd: Commands) => {
      cmdRef.current = cmd
    },
    [cmdRef]
  )

  const scrollToHost = useCallback((publicKey: string) => {
    // move table to host, select via data id data-table
    const selectedElement = document.getElementById(publicKey)
    const scrollContainer = document.getElementById('scroll-hosts')

    const containerWidth = scrollContainer.offsetWidth
    const selectedElementWidth = selectedElement.offsetWidth
    const selectedElementLeft = selectedElement.offsetLeft

    const scrollPosition =
      selectedElementLeft - containerWidth / 2 + selectedElementWidth / 2
    scrollContainer.scroll({
      left: scrollPosition,
      behavior: 'smooth',
    })
  }, [])

  const onHostMapClick = useCallback(
    (publicKey: string, location?: [number, number]) => {
      if (activeHostPublicKey === publicKey) {
        setActiveHostPublicKey(undefined)
        return
      }
      setActiveHostPublicKey(publicKey)
      if (location) {
        cmdRef.current.moveToLocation(location)
      }
      scrollToHost(publicKey)
    },
    [setActiveHostPublicKey, cmdRef, activeHostPublicKey, scrollToHost]
  )

  const onHostListClick = useCallback(
    (publicKey: string, location?: [number, number]) => {
      if (activeHostPublicKey === publicKey) {
        setActiveHostPublicKey(undefined)
        return
      }
      setActiveHostPublicKey(publicKey)
      if (location) {
        cmdRef.current.moveToLocation(location)
      }
      scrollToHost(publicKey)
    },
    [setActiveHostPublicKey, cmdRef, activeHostPublicKey, scrollToHost]
  )

  const onHostMapHover = useCallback(
    (publicKey: string, location?: [number, number]) => null,
    []
  )

  if (settings.siascan && !gpu.shouldRender) {
    return null
  }

  return (
    <div className="dark w-full h-full flex flex-col">
      <PageHead
        title="Sia Host Map"
        description="Sia hosts around the world."
        image={previews.jungle}
        path="/map"
      />
      <Navbar size="full" scrolledDown />
      <div className="flex-1">
        <Globe
          activeHost={activeHost}
          hosts={hosts}
          onHostClick={onHostMapClick}
          onHostHover={onHostMapHover}
          onMount={(cmd) => {
            setCmd(cmd)
          }}
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="flex flex-col">
          <div className="flex px-3 justify-between">
            <Tooltip
              align="start"
              content={'The map features a random sample of active hosts.'}
            >
              <Text
                size="12"
                weight="medium"
                noWrap
                className="hidden md:flex py-1.5"
              >
                {stats.activeHosts} hosts
              </Text>
            </Tooltip>
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
                {stats.totalStorage}
              </Text>
            </Tooltip>
          </div>
          <ScrollArea id="scroll-hosts">
            <div className="flex px-2 pb-2 pt-1 gap-2">
              {hosts.map((h, i) => (
                <div key={h.publicKey}>
                  <HostItem
                    host={h}
                    activeHost={activeHost}
                    selectActiveHost={() =>
                      onHostListClick(h.publicKey, [
                        h.location.latitude,
                        h.location.longitude,
                      ])
                    }
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
