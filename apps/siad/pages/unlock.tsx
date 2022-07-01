import {
  Button,
  Flex,
  Paragraph,
  TextField,
} from '@siafoundation/design-system'
import { useSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { PublicLayout } from '../components/PublicLayout'
import { routes } from '../config/routes'

export default function Unlock() {
  const router = useRouter()
  const [password, setPassword] = useState<string>()
  const { setSettings } = useSettings()

  const unlock = useCallback(() => {
    const func = async () => {
      try {
        setSettings({ password })
        const resp = await fetch('/api/wallet/balance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`:${password}`),
          },
        })

        if (resp.status !== 200) {
          throw new Error(await resp.text())
        } else {
          router.push(routes.home)
        }
      } catch (e) {
        console.log(e)
      }
    }
    func()
  }, [password, router, setSettings])

  return (
    <PublicLayout>
      <Flex direction="column" gap="3">
        <Flex direction="column" gap="2">
          <Paragraph>Welcome to siad</Paragraph>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={unlock}>Unlock</Button>
        </Flex>
      </Flex>
    </PublicLayout>
  )
}
