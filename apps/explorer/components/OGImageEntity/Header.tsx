import { type AvatarGrid } from '@siafoundation/design-system'

export function Header({
  initials,
  title,
  subtitle,
  avatarGrid,
}: {
  initials: string
  title: string
  subtitle: string
  avatarGrid?: AvatarGrid
}) {
  const avatarSize = 96
  const cellSize = avatarSize / 5

  return (
    <div
      tw="flex items-center"
      style={{
        gap: '20px',
        display: 'flex',
      }}
    >
      {avatarGrid ? (
        <div
          tw="relative rounded border flex"
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: '4px',
            borderWidth: '1px',
            borderColor: 'rgba(156, 163, 175, 0.2)',
            overflow: 'hidden',
          }}
        >
          {avatarGrid.flat().map((cell, index) => {
            const bgColor = `rgb(${cell.color.r}, ${cell.color.g}, ${cell.color.b})`
            return (
              <div
                key={`${cell.x}-${cell.y}-${index}`}
                style={{
                  position: 'absolute',
                  left: cell.x * cellSize,
                  top: cell.y * cellSize,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: bgColor,
                }}
              />
            )
          })}
        </div>
      ) : (
        <div tw="w-24 h-24 bg-white rounded text-4xl text-black items-center justify-center flex">
          {initials}
        </div>
      )}
      <div tw="flex flex-1 flex-col" style={{ gap: '8px' }}>
        <span tw="text-4xl text-white font-semibold">{title}</span>
        <span tw="text-2xl text-white/50">{subtitle}</span>
      </div>
    </div>
  )
}
