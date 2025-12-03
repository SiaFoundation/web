import {
  AppSettingsProvider,
  CoreProvider,
  delay,
} from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { SiacoinField } from './SiacoinField'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState, act } from 'react'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { TooltipProvider } from '../hooks/tooltip'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/some-route'),
}))

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('SiacoinField', () => {
  it('updates fiat and external value immediately', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(33),
      onChange,
    })

    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }

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
    expect(onChange.mock.calls.length).toBe(5)
    expect(Number(onChange.mock.calls[4][0])).toBe(444)
    expectOnChangeValues(['33', undefined, '4', '44', '444'], onChange)
  })

  it('updates value starting with decimal', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(33),
      onChange,
    })

    expect(scInput.value).toBe('33')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('$33')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '.44')
    fireEvent.blur(scInput)
    expect(scInput.value).toBe('0.44')
    expect(fiatInput.value).toBe('$0.44')
  })

  it('updates value starting with comma decimal separator', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(33),
      locale: 'de-DE',
      onChange,
    })

    expect(scInput.value).toBe('33')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('$33')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, ',44')
    fireEvent.blur(scInput)
    expect(scInput.value).toBe('0,44')
    expect(fiatInput.value).toBe('$0,44')
  })

  it('works with alternate locale: DE', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(3333),
      locale: 'de-DE',
      onChange,
    })

    expect(scInput.value).toBe('3.333')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('$3.333')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '4444')
    await user.type(scInput, '.5')
    expect(scInput.value).toBe('4.444,5')
    expect(fiatInput.value).toBe('$4.444,5')
    await user.type(scInput, ',5')
    expect(scInput.value).toBe('4.444,55')
    expect(fiatInput.value).toBe('$4.444,55')
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
      onChange,
    )
  })

  it('works with alternate locale: DE and alternate currency', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(3333),
      locale: 'de-DE',
      prefix: '₽',
      onChange,
    })

    expect(scInput.value).toBe('3.333')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('₽3.333')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '4444')
    await user.type(scInput, '.5')
    expect(scInput.value).toBe('4.444,5')
    expect(fiatInput.value).toBe('₽4.444,5')
    await user.type(scInput, '5')
    expect(scInput.value).toBe('4.444,55')
    expect(fiatInput.value).toBe('₽4.444,55')
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
      onChange,
    )
  })

  it('works with alternate locale: ES', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(3333),
      locale: 'es-ES',
      prefix: '₽',
      onChange,
    })

    expect(scInput.value).toBe('3.333')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('₽3.333')
    await user.click(scInput)
    await user.clear(scInput)
    await user.type(scInput, '4444')
    await user.type(scInput, '.5')
    expect(scInput.value).toBe('4.444,5')
    expect(fiatInput.value).toBe('₽4.444,5')
    await user.type(scInput, ',5')
    expect(scInput.value).toBe('4.444,55')
    expect(fiatInput.value).toBe('₽4.444,55')
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
      onChange,
    )
  })

  it('rounds to 6 decimal places', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.123456789),
      onChange,
    })

    expect(scInput.value).toBe('0.123457')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('$0.123457')
    await user.click(scInput)
    await user.clear(scInput)
    // Field will not accept user input past 6
    await user.type(scInput, '0.123456789')
    fireEvent.blur(scInput)
    // Either way limits to 6 (not rounding)
    expect(scInput.value).toBe('0.123456')
    expect(fiatInput.value).toBe('$0.123456')
    expect(onChange.mock.calls.length).toBe(10)
    expect(Number(onChange.mock.calls[9][0])).toBe(0.123456)
    expectOnChangeValues(
      [
        '0.123457',
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
      onChange,
    )
  })

  it('updates sc based on fiat change', async () => {
    mockEndpoints('1')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.444),
      onChange,
    })

    expect(scInput.value).toBe('0.444')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('$0.444')
    await user.click(fiatInput)
    await user.clear(fiatInput)
    await user.type(fiatInput, '0.123')
    fireEvent.blur(fiatInput)
    expect(scInput.value).toBe('0.123')
    expect(fiatInput.value).toBe('$0.123')
    expect(onChange.mock.calls.length).toBe(12)
    expectOnChangeValues(
      [
        '0.444',
        undefined,
        undefined,
        '0',
        '0',
        '0',
        '0.1',
        '0.1',
        '0.12',
        '0.12',
        '0.123',
        '0.123',
      ],
      onChange,
    )
  })

  it('handles backspacing fiat without applying rounding', async () => {
    // since updating fiat immediately updates siacoin, the source of truth
    // this test asserts that the siacoin values does not then immediately
    // re-update the fiat with a new rounded value.
    mockEndpoints('0.003494929784')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(45.47473),
      onChange,
    })

    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }

    expect(fiatInput.value).toBe('$0.158931')
    expect(scInput.value).toBe('45.47473')
    await user.click(fiatInput)
    await user.type(fiatInput, '{backspace}')
    await user.type(fiatInput, '{backspace}')
    await user.type(fiatInput, '{backspace}')
    fireEvent.blur(fiatInput)
    expect(fiatInput.value).toBe('$0.158')
    expect(scInput.value).toBe('45.208347')
    expect(onChange.mock.calls.length).toBe(7)
    expectOnChangeValues(
      [
        '45.47473',
        '45.474447',
        '45.474447',
        '45.465863',
        '45.465863',
        '45.208347',
        '45.208347',
      ],
      onChange,
    )
  })

  it('rounds when changing fiat with realistic exchange rate', async () => {
    mockEndpoints('0.003623859876')
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.444),
      onChange,
    })

    expect(scInput.value).toBe('0.444')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
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
      ['0.444', undefined, '0', '0', '0.1', '0.12', '0.123'],
      onChange,
    )
  })

  it('touching the fiat field without changing it does not trigger', async () => {
    mockEndpoints('0.003623859876')
    const onChange = jest.fn()
    const { scInput, fiatInput } = await renderNode({
      sc: new BigNumber(0.444),
      onChange,
    })

    expect(scInput.value).toBe('0.444')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('$0.001609')
    fireEvent.focus(fiatInput)
    expect(scInput.value).toBe('0.444')
    expect(fiatInput.value).toBe('$0.001609')
    expect(onChange.mock.calls.length).toBe(1)
    expectOnChangeValues(['0.444'], onChange)
  })

  it('shows visual indicator when fiat is enabled but rate is unavailable', async () => {
    mockEndpointsWithError()
    const onChange = jest.fn()
    const { scInput, node } = await renderNode({
      sc: new BigNumber(100),
      onChange,
      showFiat: true,
    })

    expect(scInput.value).toBe('100')

    const indicator = node.getByTestId('fiatRateUnavailable')
    expect(indicator).toBeTruthy()

    // Verify fiat input is not shown
    const fiatInput = node.queryByTestId('fiatInput')
    expect(fiatInput).toBeNull()

    // Verify indicator text is present
    expect(indicator.textContent).toContain('Exchange rate unavailable')
  })

  it('does not show indicator when showFiat is false', async () => {
    mockEndpointsWithError()
    const onChange = jest.fn()
    const { scInput, node } = await renderNode({
      sc: new BigNumber(100),
      onChange,
      showFiat: false,
    })

    expect(scInput.value).toBe('100')

    const indicator = node.queryByTestId('fiatRateUnavailable')
    expect(indicator).toBeNull()

    const fiatInput = node.queryByTestId('fiatInput')
    expect(fiatInput).toBeNull()
  })

  it('does not show indicator when rate is available', async () => {
    mockEndpoints('1')
    const onChange = jest.fn()
    const { scInput, fiatInput, node } = await renderNode({
      sc: new BigNumber(100),
      onChange,
      showFiat: true,
    })

    expect(scInput.value).toBe('100')
    if (!fiatInput) {
      throw new Error('Fiat input not found')
    }
    expect(fiatInput.value).toBe('$100')
    const indicator = node.queryByTestId('fiatRateUnavailable')
    expect(indicator).toBeNull()
  })
})

function Component({
  sc: initalSc,
  ...props
}: { sc: BigNumber } & Partial<React.ComponentProps<typeof SiacoinField>>) {
  const [sc, setSc] = useState<BigNumber | undefined>(new BigNumber(initalSc))
  return <SiacoinField sc={sc} onChange={setSc} {...props} />
}

const daemonExplorerInfoRoute = '/explorer/info'

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
      <AppSettingsProvider daemonExplorerInfoRoute={daemonExplorerInfoRoute}>
        <TooltipProvider>
          <Component sc={sc} {...props} />
        </TooltipProvider>
      </AppSettingsProvider>
    </CoreProvider>,
  )

  const scInput = node.getByTestId('scInput') as HTMLInputElement

  if (props.showFiat) {
    // Wait for either fiat input (when rate is available) or indicator (when rate is unavailable)
    await waitFor(
      () => {
        const fiatInput = node.queryByTestId('fiatInput') as HTMLInputElement
        const indicator = node.queryByTestId('fiatRateUnavailable')
        expect(fiatInput || indicator).toBeTruthy()
        if (fiatInput) {
          expect(fiatInput?.value).toBeTruthy()
        }
      },
      { timeout: 3000 },
    )
  }

  // Let the component set state and finish the next render pass.
  await act(async () => {
    await delay(100)
  })

  const fiatInput = node.queryByTestId('fiatInput') as HTMLInputElement | null
  return { scInput, fiatInput, node }
}

function mockDaemonExplorerEndpoint() {
  server.use(
    http.get(`http://localhost/api${daemonExplorerInfoRoute}`, () => {
      return HttpResponse.json({
        explorer: {
          url: 'https://api.siascan.com',
          enabled: true,
        },
      })
    }),
  )
}

function mockSiascanExchangeRateEndpoint(rate = '1') {
  server.use(
    http.get('https://api.siascan.com/exchange-rate/siacoin/*', () => {
      return HttpResponse.json(rate)
    }),
  )
}

function mockEndpoints(rate = '1') {
  mockDaemonExplorerEndpoint()
  mockSiascanExchangeRateEndpoint(rate)
}

function mockEndpointsWithError() {
  mockDaemonExplorerEndpoint()
  // Mock exchange rate endpoint to return an error
  // This simulates the rate being unavailable
  server.use(
    http.get('https://api.siascan.com/exchange-rate/siacoin/*', () => {
      return HttpResponse.json(null, { status: 500 })
    }),
  )
}

function expectOnChangeValues(values: (string | undefined)[], fn: jest.Mock) {
  const matches: (string | undefined)[] = []
  fn.mock.calls.forEach((call) => {
    matches.push(call[0]?.toString())
  })
  expect(matches).toEqual(values)
}
