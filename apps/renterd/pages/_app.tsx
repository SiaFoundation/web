import { NextApp } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { Providers } from '../config/providers'

export default function App(props: AppProps) {
  return (
    <Providers>
      <NextApp {...props} />
    </Providers>
  )
}
