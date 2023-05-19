import { SiaStatsHostCoordinate } from '@siafoundation/react-core'
import createGlobe from 'cobe'
import { MutableRefObject, useEffect, useRef } from 'react'

type Props = {
  activeHost?: SiaStatsHostCoordinate
  markers: { location: number[]; size: number }[]
  focus: MutableRefObject<[number, number]>
}

export function Globe({ focus, markers }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>()
  useEffect(() => {
    let width = 0
    let currentPhi = 0
    let currentTheta = 0
    const doublePi = Math.PI * 2
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 20_000,
      mapBrightness: 1.2,
      baseColor: [0.7, 0.7, 0.7],
      markerColor: [20 / 255, 205 / 255, 1 / 255],
      glowColor: [0.1, 0.1, 0.1],
      markers: [],
      // scale: 2.5,
      offset: [0, width * 2 * 0.4 * 0.6],
      onRender: (state) => {
        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focus.current || [0, 0]
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
        state.markers = markers
      },
    })
    setTimeout(() => (canvasRef.current.style.opacity = '1'), 100)
    return () => globe.destroy()
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
