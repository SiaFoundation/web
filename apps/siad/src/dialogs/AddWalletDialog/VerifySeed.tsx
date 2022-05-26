import { Box, ComboBox, Grid, Text } from '@siafoundation/design-system'
import { useEffect, useMemo, useState } from 'react'
import { mnemonics } from './mnemonics'
import { SeedLayout } from './SeedLayout'

const mnemonicsOptions = mnemonics.map((word) => ({
  label: word,
  value: word,
}))

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createIndexList = () => {
  const res: number[] = []
  for (let i = 0; i < 4; i++) {
    let random = getRandomInt(0, 27)
    while (res.includes(random)) {
      random = getRandomInt(0, 27)
    }
    res.push(random)
  }
  return res
}

type Props = {
  seed: string
  onChange: (valid: boolean) => void
}

export function VerifySeed({ seed, onChange }: Props) {
  const hideSeedIndicies = useMemo(() => {
    return createIndexList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed])

  const seedList = useMemo(() => seed.split(' '), [seed])

  const indicesToCheck = useMemo(
    () =>
      seedList
        .map((_, i) => (hideSeedIndicies.includes(i) ? i : null))
        .filter((x) => typeof x === 'number'),
    [seedList, hideSeedIndicies]
  )

  const { initialSeedState, validationState } = useMemo(() => {
    const mappedInitialState: Record<number, string | undefined> = {}
    const validationArray: boolean[] = []

    for (let x = 0, y = seedList.length; x < y; x++) {
      const isFiltered = indicesToCheck.includes(x)
      mappedInitialState[x] = isFiltered ? '' : seedList[x]
      validationArray.push(isFiltered ? false : true)
    }
    return {
      initialSeedState: mappedInitialState,
      validationState: validationArray,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed])

  const [seedInputs, setSeedInput] = useState(initialSeedState)
  const [validation, setValidation] = useState(validationState)

  useEffect(() => {
    const newValidationArray: boolean[] = []
    for (let x = 0, y = seedList.length; x < y; x++) {
      const isMatch = seedList[x] === seedInputs[x]
      newValidationArray.push(isMatch)
    }
    // set validation for parent
    if (newValidationArray.every((x) => x)) {
      onChange(true)
    } else {
      onChange(false)
    }

    setValidation(newValidationArray)
  }, [seedInputs, seedList])

  return (
    <SeedLayout
      seed={seed}
      icon={<VerifyIcon />}
      description={
        <>
          Let's verify your seed. <br />
          We've removed a few random seed words from the seed file. Enter them
          back in to confirm your seed is accurate.
        </>
      }
    >
      <Grid columns="5" gap={3}>
        {seedList.map((v, i) => {
          const hideWord = hideSeedIndicies.includes(i)
          const seedInput = seedInputs[i]
          const selectedOption = seedInput
            ? {
                value: seedInput,
                label: seedInput,
              }
            : undefined
          return (
            <Box>
              {hideWord ? (
                <ComboBox
                  size="1"
                  state={!validation[i] ? 'invalid' : 'valid'}
                  options={mnemonicsOptions}
                  indicators={false}
                  prefix={
                    <Text size="10" color="accent">
                      {i}
                    </Text>
                  }
                  value={selectedOption}
                  onChange={(option) =>
                    setSeedInput({ ...seedInputs, [i]: option?.value })
                  }
                />
              ) : (
                <ComboBox
                  size="1"
                  options={[]}
                  indicators={false}
                  disabled
                  prefix={
                    <Text size="10" color="accent">
                      {i}
                    </Text>
                  }
                  value={selectedOption}
                  onChange={(option) =>
                    setSeedInput({ ...seedInputs, [i]: option?.value })
                  }
                />
              )}
            </Box>
          )
        })}
      </Grid>
    </SeedLayout>
  )
}

function VerifyIcon() {
  return (
    <svg
      height={50}
      width={50}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>filter check</title>
      <g fill="#32d66a" stroke="none">
        <path d="M14,19H2a1,1,0,0,0,0,2H14a1,1,0,0,0,0-2Z" fill="#32d66a" />
        <path d="M14,27H2a1,1,0,0,0,0,2H14a1,1,0,0,0,0-2Z" fill="#32d66a" />
        <path d="M30,11H2a1,1,0,0,0,0,2H30a1,1,0,0,0,0-2Z" fill="#32d66a" />
        <path d="M2,5H30a1,1,0,0,0,0-2H2A1,1,0,0,0,2,5Z" fill="#32d66a" />
        <path d="M25,17a7,7,0,1,0,7,7A7.008,7.008,0,0,0,25,17Zm-.293,9.707a1,1,0,0,1-1.414,0L20.586,24,22,22.586l2,2,4-4L29.414,22Z" />
      </g>
    </svg>
  )
}
