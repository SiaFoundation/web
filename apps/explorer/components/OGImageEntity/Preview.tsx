/* eslint-disable @next/next/no-img-element */

import { cx } from 'class-variance-authority'
import { Background } from '../OGImage/Background'
import { Header } from './Header'

type Props = {
  id: string
  avatar?: boolean
  title: string
  subtitle: string
  initials: string
  status?: string
  statusColor?: string
  values?: { label?: string; value: string }[]
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
  return (
    <div tw="bg-black w-full h-full flex items-center justify-center">
      <Background />
      <div
        tw="flex flex-col justify-between absolute top-0 left-0 w-full h-full p-10"
        style={{
          gap: '20px',
        }}
      >
        <div tw="flex items-center justify-between w-full">
          <Header
            title={title}
            subtitle={subtitle}
            initials={initials}
            avatar={avatar ? id : undefined}
          />
          {status && (
            <div
              tw={cx(
                'pt-1 pb-2 px-3 rounded text-2xl text-white items-center justify-center',
                statusColor === 'amber' ? 'bg-amber-400' : '',
                statusColor === 'green' ? 'bg-green-600' : '',
                statusColor === 'red' ? 'bg-red-400' : ''
              )}
            >
              {status}
            </div>
          )}
        </div>
        <div
          tw="flex justify-between"
          style={{
            gap: '80px',
          }}
        >
          {values?.map(({ label, value }) => (
            <div
              key={label + value}
              tw="flex flex-col items-end"
              style={{
                gap: '5px',
              }}
            >
              <span tw="text-white text-6xl">{value}</span>
              {label && <span tw="text-white text-2xl">{label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
