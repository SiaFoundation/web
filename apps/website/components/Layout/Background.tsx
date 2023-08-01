type Props = {
  background: string
}

export function Background({ background }: Props) {
  return (
    <div className="absolute right-0 top-0 left-0 z-0 h-screen w-full overflow-hidden bg-white select-none">
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
