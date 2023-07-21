import { SiaStatsHostCoordinate } from '@siafoundation/react-core'
import createGlobe, { Marker } from 'cobe'
import { MutableRefObject, useEffect, useRef } from 'react'

type Props = {
  activeHost?: SiaStatsHostCoordinate
  markers: Marker[]
  focus: MutableRefObject<[number, number]>
}

export function Globe({ focus, markers }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>()
  const position = useRef<{
    phi: number
    theta: number
  }>({ phi: 0, theta: 0.3 })

  useEffect(() => {
    let width = 0
    const doublePi = Math.PI * 2
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: position.current.phi,
      theta: position.current.theta,
      dark: 1,
      diffuse: 3,
      mapSamples: 20_000,
      mapBrightness: 1.2,
      baseColor: [0.7, 0.7, 0.7],
      markerColor: [20 / 255, 205 / 255, 1 / 255],
      glowColor: [0.1, 0.1, 0.1],
      markers,
      // scale: 2.5,
      offset: [0, width * 2 * 0.4 * 0.6],
      onRender: (state) => {
        state.phi = position.current.phi
        state.theta = position.current.theta
        const [focusPhi, focusTheta] = focus.current || [0, 0]
        const distPositive =
          (focusPhi - position.current.phi + doublePi) % doublePi
        const distNegative =
          (position.current.phi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          position.current.phi += distPositive * 0.08
        } else {
          position.current.phi -= distNegative * 0.08
        }
        position.current.theta =
          position.current.theta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
      },
    })
    setTimeout(() => (canvasRef.current.style.opacity = '1'), 100)
    return () => {
      window.removeEventListener('resize', onResize)
      globe.destroy()
    }
    // remount when markers change so that active marker is updated
    // animations look ok because the phi and theta are saved
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers])

  return (
    <div className="relative w-full aspect-square">
      <canvas
        ref={canvasRef}
        className="w-full h-full top-0 opacity-0 transition-opacity"
        style={{
          contain: 'layout paint size',
        }}
      />
    </div>
  )
}
