import { ComboBox, Grid, Text } from '@siafoundation/design-system'
import { useEffect, useMemo } from 'react'
import { SeedLayout } from './SeedLayout'

type Props = {
  seed: string
  onChange: (seed: string) => void
}

export function GenerateSeed({ seed, onChange }: Props) {
  const seedList = useMemo(() => seed.split(' '), [seed])

  useEffect(() => {
    onChange(seed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const comboBoxes = useMemo(
    () =>
      seedList.map((v, i) => (
        <ComboBox
          key={v}
          size="1"
          options={[]}
          disabled
          value={{
            label: v,
            value: v,
          }}
          indicators={false}
          prefix={
            <Text size="10" color="accent">
              {i}
            </Text>
          }
        />
      )),
    [seedList]
  )
  return (
    <SeedLayout
      seed={seed}
      icon={<SeedIcon />}
      description={
        <>
          This is your Sia seed. Please copy and store your seed somewhere safe,
          because there's no way to recover it. Your seed is used to unlock your
          wallet and can recover your Siacoins and uploaded files.
        </>
      }
    >
      <Grid columns="5" gap="3">
        {comboBoxes}
      </Grid>
    </SeedLayout>
  )
}

function SeedIcon() {
  return (
    <svg
      height={50}
      width={50}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>key</title>
      <g fill="#32d66a" stroke="#32d66a" strokeLinecap="square" strokeWidth="2">
        <path
          d="M25,1,12.784,13.154a8.572,8.572,0,1,0,6.061,6.061L21,17V13h4V9h3l3-3V1Z"
          fill="none"
          stroke="#32d66a"
        />
        <circle cx="10" cy="22" fill="none" r="3" />
      </g>
    </svg>
  )
}
