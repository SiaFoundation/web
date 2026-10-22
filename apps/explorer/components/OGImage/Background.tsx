/* eslint-disable @next/next/no-img-element */

export function Background({ pattern }: { pattern: string }) {
  return (
    <div tw="flex absolute w-full h-full top-0 left-0">
      <img tw="absolute w-full h-full opacity-10" alt="bg" src={pattern} />
    </div>
  )
}
