import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { NumberField } from './NumberField'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/some-route'),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
}))

describe('NumberField', () => {
  it('updates external value immediately', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { input } = await renderNode({
      initialValue: new BigNumber(33),
      onChange,
    })

    expect(input.value).toBe('33')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '44')
    fireEvent.blur(input)
    expect(input.value).toBe('44')
    expect(onChange.mock.calls.length).toBe(3)
    expect(Number(onChange.mock.calls[2][0])).toBe(44)
    await user.click(input)
    await user.type(input, '4')
    fireEvent.blur(input)
    expect(input.value).toBe('444')
    expect(onChange.mock.calls.length).toBe(4)
    expect(Number(onChange.mock.calls[3][0])).toBe(444)
    expectOnChangeValues([undefined, '4', '44', '444'], onChange)
  })

  it('updates value starting with decimal', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { input } = await renderNode({
      initialValue: new BigNumber(33),
      onChange,
    })

    expect(input.value).toBe('33')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '.44')
    fireEvent.blur(input)
    expect(input.value).toBe('0.44')
  })

  it('updates value starting with comma decimal separator', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { input } = await renderNode({
      initialValue: new BigNumber(33),
      locale: 'de-DE',
      onChange,
    })

    expect(input.value).toBe('33')
    await user.click(input)
    await user.clear(input)
    await user.type(input, ',44')
    fireEvent.blur(input)
    expect(input.value).toBe('0,44')
  })

  it('works with alternate locale: DE', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { input } = await renderNode({
      initialValue: new BigNumber(3333),
      locale: 'de-DE',
      onChange,
    })

    expect(input.value).toBe('3.333')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '4444')
    await user.type(input, '.5')
    expect(input.value).toBe('4.444,5')
    await user.type(input, ',5')
    expect(input.value).toBe('4.444,55')
    expectOnChangeValues(
      [
        '3333',
        undefined,
        '4',
        '44',
        '444',
        '4444',
        '4444',
        '4444.5',
        '4444.55',
      ],
      onChange
    )
  })

  it('works with alternate locale: ES', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { input } = await renderNode({
      initialValue: new BigNumber(3333),
      locale: 'es-ES',
      prefix: '₽',
      onChange,
    })

    expect(input.value).toBe('₽3.333')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '4444')
    await user.type(input, '.5')
    expect(input.value).toBe('₽4.444,5')
    await user.type(input, ',5')
    expect(input.value).toBe('₽4.444,55')
    expectOnChangeValues(
      [
        '3333',
        undefined,
        '4',
        '44',
        '444',
        '4444',
        '4444',
        '4444.5',
        '4444.55',
      ],
      onChange
    )
  })

  it('rounds to 6 decimal places', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { input } = await renderNode({
      initialValue: new BigNumber(0.123456789),
      onChange,
    })

    expect(input.value).toBe('0.123457')
    await user.click(input)
    await user.clear(input)
    // Field will not accept user input past 6
    await user.type(input, '0.123456789')
    fireEvent.blur(input)
    // Either way limits to 6 (not rounding)
    expect(input.value).toBe('0.123456')
    expect(onChange.mock.calls.length).toBe(9)
    expect(Number(onChange.mock.calls[8][0])).toBe(0.123456)
    expectOnChangeValues(
      [
        undefined,
        '0',
        '0',
        '0.1',
        '0.12',
        '0.123',
        '0.1234',
        '0.12345',
        '0.123456',
      ],
      onChange
    )
  })
})

function Component({
  initialValue,
  ...props
}: { initialValue: BigNumber } & Partial<
  React.ComponentProps<typeof NumberField>
>) {
  const [value, setValue] = useState<BigNumber>(initialValue)
  return (
    <NumberField
      value={value}
      onChange={(v) => setValue(v || new BigNumber(NaN))}
      {...props}
    />
  )
}

async function renderNode({
  initialValue,
  locale = 'en',
  ...props
}: { initialValue: BigNumber; locale?: 'en' | 'de-DE' | 'es-ES' } & Partial<
  React.ComponentProps<typeof NumberField>
>) {
  jest.spyOn(window.navigator, 'language', 'get').mockReturnValue(locale)

  const node = render(
    <CoreProvider cacheProvider={() => new Map()}>
      <AppSettingsProvider>
        <Component initialValue={initialValue} {...props} />
      </AppSettingsProvider>
    </CoreProvider>
  )

  const input = node.getByTestId('numberfield') as HTMLInputElement
  await waitFor(() => expect(input.value).toBeTruthy())
  return { input }
}

function expectOnChangeValues(values: (string | undefined)[], fn: jest.Mock) {
  const matches: (string | undefined)[] = []
  fn.mock.calls.forEach((call) => {
    matches.push(call[0]?.toString())
  })
  expect(matches).toEqual(values)
}
