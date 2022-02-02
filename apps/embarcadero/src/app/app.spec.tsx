import { render } from '@testing-library/react'

import App from './app'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)

    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    const { getAllByText } = render(<App />)

    expect(getAllByText(/Embarcadero/gi)).toBeTruthy()
  })
})
