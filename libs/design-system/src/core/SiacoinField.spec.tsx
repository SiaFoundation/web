import {
  AppSettingsProvider,
  CoreProvider,
  SiaCentralExchangeRateGET,
} from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { SiacoinField } from './SiacoinField'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { useState } from 'react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
}))

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('SiacoinField', () => {
  it('updates fiat and external value immediately', async () => {
    siaCentralExchangeRateEndpoint('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(33),
      onChange,
    })

    expect(scInput.value).toBe('33')
    expect(fiatInput.value).toBe('$33')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '44')
    fireEvent.blur(scInput)
    expect(scInput.value).toBe('44')
    expect(fiatInput.value).toBe('$44')
    expect(onChange.mock.calls.length).toBe(4)
    expect(Number(onChange.mock.calls[3][0])).toBe(44)
    // for some reason after fireEvent.blur, user.click does not trigger a re-focus
    fireEvent.focus(scInput)
    await user.click(scInput)
    await user.type(scInput, '4')
    fireEvent.blur(scInput)
    expect(scInput.value).toBe('444')
    expect(fiatInput.value).toBe('$444')
    expect(onChange.mock.calls.length).toBe(6)
    expect(Number(onChange.mock.calls[5][0])).toBe(444)
    expectOnChangeValues([undefined, '4', '44', '44', '444', '444'], onChange)
  })

  it('works with alternate locale: DE', async () => {
    siaCentralExchangeRateEndpoint('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(3333),
      locale: 'de-DE',
      onChange,
    })

    expect(scInput.value).toBe('3.333')
    expect(fiatInput.value).toBe('$3.333')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '4444')
    await user.type(scInput, '.5')
    expect(scInput.value).toBe('44.445')
    expect(fiatInput.value).toBe('$44.445')
    await user.type(scInput, ',5')
    expect(scInput.value).toBe('44.445,5')
    expect(fiatInput.value).toBe('$44.445,5')
    expectOnChangeValues(
      [
        undefined,
        '4',
        '44',
        '444',
        '4444',
        '4444',
        '44445',
        '44445',
        '44445.5',
      ],
      onChange
    )
  })

  it('works with alternate locale: DE and alternate currency', async () => {
    siaCentralExchangeRateEndpoint('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(3333),
      locale: 'de-DE',
      prefix: '₽',
      onChange,
    })

    expect(scInput.value).toBe('3.333')
    expect(fiatInput.value).toBe('₽3.333')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '4444')
    await user.type(scInput, '.5')
    expect(scInput.value).toBe('44.445')
    expect(fiatInput.value).toBe('₽44.445')
    await user.type(scInput, ',5')
    expect(scInput.value).toBe('44.445,5')
    expect(fiatInput.value).toBe('₽44.445,5')
    expectOnChangeValues(
      [
        undefined,
        '4',
        '44',
        '444',
        '4444',
        '4444',
        '44445',
        '44445',
        '44445.5',
      ],
      onChange
    )
  })

  it('works with alternate locale: ES', async () => {
    siaCentralExchangeRateEndpoint('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(3333),
      locale: 'es-ES',
      prefix: '₽',
      onChange,
    })

    expect(scInput.value).toBe('3333')
    expect(fiatInput.value).toBe('₽3333')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '4444')
    await user.type(scInput, '.5')
    expect(scInput.value).toBe('44445')
    expect(fiatInput.value).toBe('₽44445')
    await user.type(scInput, ',5')
    expect(scInput.value).toBe('44445,5')
    expect(fiatInput.value).toBe('₽44445,5')
    expectOnChangeValues(
      [
        undefined,
        '4',
        '44',
        '444',
        '4444',
        '4444',
        '44445',
        '44445',
        '44445.5',
      ],
      onChange
    )
  })

  it('rounds to 6 decimal places', async () => {
    siaCentralExchangeRateEndpoint('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.123456789),
      onChange,
    })

    expect(scInput.value).toBe('0.123457')
    expect(fiatInput.value).toBe('$0.123457')
    await user.click(scInput)
    await user.clear(scInput)
    // Field will not accept user input past 6
    await user.type(scInput, '0.123456789')
    fireEvent.blur(scInput)
    // Either way limits to 6 (not rounding)
    expect(scInput.value).toBe('0.123456')
    expect(fiatInput.value).toBe('$0.123456')
    expect(onChange.mock.calls.length).toBe(13)
    expect(Number(onChange.mock.calls[12][0])).toBe(0.123456)
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
        '0.123456',
        '0.123456',
        '0.123456',
        '0.123456',
      ],
      onChange
    )
  })

  it('updates sc based on fiat change', async () => {
    siaCentralExchangeRateEndpoint('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.444),
      onChange,
    })

    expect(scInput.value).toBe('0.444')
    expect(fiatInput.value).toBe('$0.444')
    await user.click(fiatInput)
    await user.clear(fiatInput)
    await user.type(fiatInput, '0.123')
    fireEvent.blur(fiatInput)
    expect(scInput.value).toBe('0.123')
    expect(fiatInput.value).toBe('$0.123')
    expect(onChange.mock.calls.length).toBe(6)
    expectOnChangeValues(
      [undefined, '0', '0', '0.1', '0.12', '0.123'],
      onChange
    )
  })

  it('handles backspacing fiat without applying rounding', async () => {
    // since updating fiat immediately updates siacoin, the source of truth
    // this test asserts that the siacoin values does not then immediately
    // re-update the fiat with a new rounded value.
    siaCentralExchangeRateEndpoint('0.003494929784')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(45.47473),
      onChange,
    })

    expect(fiatInput.value).toBe('$0.158931')
    expect(scInput.value).toBe('45.47473')
    await user.click(fiatInput)
    await user.type(fiatInput, '{backspace}')
    await user.type(fiatInput, '{backspace}')
    await user.type(fiatInput, '{backspace}')
    fireEvent.blur(fiatInput)
    expect(fiatInput.value).toBe('$0.158')
    expect(scInput.value).toBe('45.208347')
    expect(onChange.mock.calls.length).toBe(3)
    expectOnChangeValues(['45.474447', '45.465863', '45.208347'], onChange)
  })

  it('rounds when changing fiat with realistic exchange rate', async () => {
    siaCentralExchangeRateEndpoint('0.003623859876')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.444),
      onChange,
    })

    expect(scInput.value).toBe('0.444')
    expect(fiatInput.value).toBe('$0.001609')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '0.123')
    fireEvent.blur(scInput)
    expect(scInput.value).toBe('0.123')
    expect(fiatInput.value).toBe('$0.000446')
    // Fires one more time because the currency inut component fires onValueChange on blur.
    expect(onChange.mock.calls.length).toBe(7)
    expectOnChangeValues(
      [undefined, '0', '0', '0.1', '0.12', '0.123', '0.123'],
      onChange
    )
  })

  it('touching the fiat field without changing it does not trigger', async () => {
    siaCentralExchangeRateEndpoint('0.003623859876')
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.444),
      onChange,
    })

    expect(scInput.value).toBe('0.444')
    expect(fiatInput.value).toBe('$0.001609')
    fireEvent.focus(fiatInput)
    expect(scInput.value).toBe('0.444')
    expect(fiatInput.value).toBe('$0.001609')
    expect(onChange.mock.calls.length).toBe(0)
  })
})

function Component({
  sc: initalSc,
  ...props
}: { sc: BigNumber } & Partial<React.ComponentProps<typeof SiacoinField>>) {
  const [sc, setSc] = useState<BigNumber | undefined>(new BigNumber(initalSc))
  return <SiacoinField sc={sc} onChange={setSc} {...props} />
}

async function renderNode({
  sc,
  locale = 'en',
  ...props
}: { sc: BigNumber; locale?: 'en' | 'de-DE' | 'es-ES' } & Partial<
  React.ComponentProps<typeof SiacoinField>
>) {
  jest.spyOn(window.navigator, 'language', 'get').mockReturnValue(locale)

  const node = render(
    <CoreProvider cacheProvider={() => new Map()}>
      <AppSettingsProvider>
        <Component sc={sc} {...props} />
      </AppSettingsProvider>
    </CoreProvider>
  )

  const scInput = node.getByTestId('scInput') as HTMLInputElement
  const fiatInput = node.getByTestId('fiatInput') as HTMLInputElement
  await waitFor(() => expect(fiatInput.value).toBeTruthy())
  return { node, scInput, fiatInput }
}

function siaCentralExchangeRateEndpoint(rate = '1') {
  server.use(
    rest.get(
      'https://api.siacentral.com/v2/market/exchange-rate',
      (req, res, ctx) => {
        return res(
          ctx.json({
            message: '',
            type: '',
            rates: {
              sc: {
                bch: rate,
                btc: rate,
                cad: rate,
                cny: rate,
                eth: rate,
                eur: rate,
                gbp: rate,
                jpy: rate,
                ltc: rate,
                rub: rate,
                scp: rate,
                sf: rate,
                usd: rate,
              },
            },
            timestamp: new Date().toString(),
          } as SiaCentralExchangeRateGET)
        )
      }
    )
  )
}

function expectOnChangeValues(values: (string | undefined)[], fn: jest.Mock) {
  const matches: (string | undefined)[] = []
  fn.mock.calls.forEach((call, i) => {
    matches.push(call[0]?.toString())
  })
  expect(matches).toEqual(values)
}
