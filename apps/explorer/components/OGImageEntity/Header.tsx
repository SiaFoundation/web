/* eslint-disable @next/next/no-img-element */

import { hashToAvatar } from '../../lib/avatar'
import { cx } from 'class-variance-authority'

export function Header({
  initials,
  avatar,
  title,
  subtitle,
}: {
  initials: string
  avatar?: string
  title: string
  subtitle: string
}) {
  return (
    <div
      tw="flex items-center"
      style={{
        gap: '20px',
      }}
    >
      {avatar ? (
        <img
          src={hashToAvatar(avatar)}
          tw={cx(
            'w-24 h-24 rounded border',
            'bg-white text-black',
            'border-gray-500',
          )}
          alt={initials}
        />
      ) : (
        <div tw="w-24 h-24 bg-white rounded text-4xl text-black items-center justify-center">
          {initials}
        </div>
      )}
      <div tw="flex flex-1 flex-col gap-2">
        <span tw="text-4xl text-white font-semibold">{title}</span>
        <span tw="text-2xl text-white/50">{subtitle}</span>
      </div>
    </div>
  )
}
