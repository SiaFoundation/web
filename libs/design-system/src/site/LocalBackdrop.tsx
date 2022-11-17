type Props = {
  startTime?: number
}

export function LocalBackdrop({ startTime = 0 }: Props) {
  return (
    <div className="absolute opacity-100 -z-10 top-0 left-0 right-0 bottom-0 pointer-events-none bg-white dark:bg-slate-900">
      <video
        className="absolute top-0 left-0 z-20 object-cover h-full w-full motion-reduce:hidden dark:invert-[0.9]"
        preload="true"
        autoPlay
        playsInline
        loop
        muted
        controls={false}
      >
        <source src={`/texture.mp4#t=${startTime}`} type="video/mp4" />
      </video>
    </div>
  )
}
