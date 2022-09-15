import { useSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Flex } from '../core'
import { FieldGroup, FormSubmitButton, FormTextField } from '../components/Form'

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

type Props = {
  routes: {
    home: string
  }
}

export function AppUnlockForm({ routes }: Props) {
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
          <FormTextField
            size={1}
            formik={formik}
            name="password"
            placeholder="Enter password"
            type="password"
          />
          <FormSubmitButton size="1" formik={formik}>
            Unlock
          </FormSubmitButton>
        </Flex>
      </FieldGroup>
    </form>
  )
}
