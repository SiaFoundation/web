import waves from '../assets/wave.svg'
import { getImageProps } from '../lib/image'

const wavesProps = getImageProps(waves)

export function WavesBackdrop() {
  return (
    <div className="absolute h-full w-full -z-10 top-0 left-0 opacity-[0.983] bg-gray-100 dark:bg-graydark-100">
      <div
        className="invert-0 dark:invert w-full h-full bg-repeat opacity-30"
        style={{
          background: `url(${wavesProps.src})`,
        }}
      />
    </div>
  )
}
