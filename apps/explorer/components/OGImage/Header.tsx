export function Header({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div
      tw="flex items-center"
      style={{
        gap: '20px',
      }}
    >
      <div
        tw="flex flex-col"
        style={{
          gap: '20px',
        }}
      >
        <span tw="text-8xl text-white">{title}</span>
        {subtitle && <span tw="text-2xl text-white/50">{subtitle}</span>}
      </div>
    </div>
  )
}
