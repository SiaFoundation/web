type Props = {
  focus?: boolean
  background: string
}

export function Background({ focus, background }: Props) {
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
          className="z-0 relative w-full h-full"
          style={{
            background: `url(${background})`,
            backgroundSize: 'cover',
          }}
        />
      </div>
    </div>
  )
}
