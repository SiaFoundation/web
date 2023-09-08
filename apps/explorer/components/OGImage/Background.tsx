/* eslint-disable @next/next/no-img-element */

export function Background() {
  return (
    <div tw="flex absolute w-full h-full top-0 left-0">
      <img
        tw="absolute w-full h-full opacity-10"
        alt="bg"
        src="https://sia.tech/assets/previews/leaves.png"
      />
      <div tw="absolute bottom-0 left-0 right-0 h-1 bg-green-600" />
    </div>
  )
}
