import React from 'react'
import { ImageProps } from '@siafoundation/design-system'

type Props = {
  focus?: boolean
  backgroundImage: ImageProps
}

export function BackgroundImage({ focus, backgroundImage }: Props) {
  return (
    <div
      className="absolute right-0 top-0 z-0 h-screen overflow-hidden bg-white select-none"
      style={{
        width: focus ? 'calc(100% - 600px)' : '100%',
        left: focus ? '600px' : 0,
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full mix-blend-darken z-10 bg-mask" />
        <div
          className="z-0 relative w-ful h-full"
          style={{
            background: `url(${backgroundImage.src})`,
            backgroundSize: 'cover',
            // opacity: 0.7,
          }}
        />
      </div>
    </div>
  )
}
