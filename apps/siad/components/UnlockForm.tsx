import { Button, Flex } from '@siafoundation/design-system'
import { useSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { routes } from '../config/routes'
import { useFormik } from 'formik'
import { FieldGroup, Field } from './Field'

async function checkPassword(api: string, password: string) {
  const resp = await fetch(`${api}/wallet/balance`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`:${password}`),
    },
  })
  if (resp.status === 504) {
    return 'Error, check that daemon is running'
  }
  if (resp.status === 401) {
    return 'Error, wrong password'
  }
  if (resp.status !== 200) {
    return 'Error, something went wrong'
  }
  return null
}

function wait(ms: number) {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })
}

export default function UnlockForm() {
  const router = useRouter()
  const { setSettings, api } = useSettings()

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: async (values, actions) => {
      const err = await checkPassword(api, values.password)
      if (!err) {
        setSettings({ password: values.password })
        // allow password to propagate to swr hooks
        await wait(500)
        actions.resetForm()
        router.push(routes.home)
      } else {
        actions.setErrors({
          password: err,
        })
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldGroup name="password" formik={formik}>
        <Flex gap="1">
          <Field
            size="1"
            formik={formik}
            name="password"
            placeholder="Enter password"
            type="password"
          />
          <Button
            variant="accent"
            state={formik.isSubmitting ? 'waiting' : undefined}
            type="submit"
          >
            Unlock
          </Button>
        </Flex>
      </FieldGroup>
    </form>
  )
}
