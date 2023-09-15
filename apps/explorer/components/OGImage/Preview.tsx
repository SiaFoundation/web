import { Header } from './Header'
import { Background } from './Background'

type Props = {
  title: string
  subtitle?: string
  values?: { label?: string; value: string }[]
}

export function Preview({ title, subtitle, values }: Props) {
  return (
    <div tw="bg-black w-full h-full flex items-center justify-center">
      <Background />
      <div
        tw="flex flex-col justify-between absolute top-0 left-0 w-full h-full pt-10 px-10 pb-14"
        style={{
          gap: '40px',
        }}
      >
        <Header title={title} subtitle={subtitle} />
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
      <div tw="absolute bottom-0 left-0 right-0 h-4 bg-green-600" />
    </div>
  )
}
