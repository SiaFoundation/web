/* eslint-disable @next/next/no-img-element */

import { cx } from 'class-variance-authority'
import { Background } from '../OGImage/Background'
import { Header } from './Header'
import { network } from '../../config'
import { PreviewValue } from '../OGImage/Preview'
import { generatePublicKeyAvatarGrid } from '@siafoundation/design-system'

type Props = {
  id: string
  avatar?: boolean
  title: string
  subtitle: string
  initials: string
  status?: string
  statusColor?: string
  values?: PreviewValue[]
}

export function Preview({
  id,
  avatar,
  title,
  subtitle,
  initials,
  status,
  statusColor = 'amber',
  values,
}: Props) {
  const avatarGrid = avatar ? generatePublicKeyAvatarGrid(id) : undefined

  return (
    <div tw="bg-black w-full h-full flex items-center justify-center">
      <Background />
      <div tw="flex flex-col absolute top-0 left-0 w-full h-full">
        <div tw="flex items-center justify-between w-full px-10 pt-10">
          <Header
            title={title}
            subtitle={subtitle}
            initials={initials}
            avatarGrid={avatarGrid}
          />
          {status && (
            <div
              tw={cx(
                'pt-1 pb-2 px-3 rounded text-2xl text-white items-center justify-center',
                statusColor === 'amber' ? 'bg-amber-400' : '',
                statusColor === 'green' ? 'bg-green-600' : '',
                statusColor === 'red' ? 'bg-red-400' : '',
              )}
            >
              {status}
            </div>
          )}
        </div>
        <div tw="flex flex-1" />
        <div
          tw="flex justify-start items-center px-10 pb-6"
          style={{
            gap: '8px',
          }}
        >
          <img
            src="https://sia.tech/api/media/file/shard-bleed.png"
            width="24"
            height="24"
            alt="siascan"
          />
          <span tw="font-bold text-2xl relative -top-[2px] text-white tracking-tight">
            siascan
          </span>
        </div>
        {values && (
          <div tw="flex bg-black/50 border-t-2 border-gray-400/10">
            <div
              tw="flex justify-between w-full pt-10 px-10 pb-14"
              style={{
                gap: '80px',
              }}
            >
              {values.map(({ label, value, subvalue }) => (
                <div
                  key={label + value}
                  tw="flex flex-col items-end"
                  style={{
                    gap: '5px',
                  }}
                >
                  <span tw="text-white text-6xl">{value}</span>
                  {subvalue && <span tw="text-white text-2xl">{subvalue}</span>}
                  {label && <span tw="text-white/50 text-2xl">{label}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        tw={cx(
          'absolute bottom-0 left-0 right-0 h-4',
          network !== 'mainnet' ? 'bg-amber-500' : 'bg-green-600',
        )}
      />
    </div>
  )
}
