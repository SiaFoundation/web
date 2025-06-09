/* eslint-disable @next/next/no-img-element */
import { Header } from './Header'
import { Background } from './Background'
import { cx } from 'class-variance-authority'
import { network } from '../../config'

export type PreviewValue = {
  label?: string
  value: string
  subvalue?: string
}

type Props = {
  title: string
  subtitle?: string
  values?: PreviewValue[]
}

export function Preview({ title, subtitle, values }: Props) {
  return (
    <div tw="bg-black w-full h-full flex items-center justify-center">
      <Background />
      <div tw="flex flex-col justify-between absolute top-0 left-0 w-full h-full">
        <div tw="flex items-center justify-between w-full px-10 pt-10 pb-10">
          <Header title={title} subtitle={subtitle} />
        </div>
        <div tw="flex flex-1" />
        <div
          tw={cx(
            'flex justify-start items-center px-10',
            values ? 'pb-6' : 'pb-10'
          )}
          style={{
            gap: '8px',
          }}
        >
          <img
            src="https://sia.tech/siascan/preview/logo.png"
            height="40px"
            width="40px"
            alt="logo"
          />
          <span tw="font-bold text-2xl relative -top-1 text-white tracking-tight">
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
          network !== 'mainnet' ? 'bg-amber-500' : 'bg-green-600'
        )}
      />
    </div>
  )
}
