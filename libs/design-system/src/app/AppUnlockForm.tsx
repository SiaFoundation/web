import { useAppSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { FieldGroup, FormSubmitButton, FormTextField } from '../components/Form'
import axios, { AxiosError } from 'axios'
import { Button } from '../core/Button'
import { RecentlyViewed16 } from '../icons/carbon'
import { ControlGroup } from '../core/ControlGroup'
import { DropdownMenu, DropdownMenuItem } from '../core/DropdownMenu'
import { sortBy } from 'lodash'

async function checkPassword(api: string, password: string) {
  try {
    await axios.get(`${api}/api/bus/wallet/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`:${password}`),
      },
    })
  } catch (e: unknown) {
    const resp = (e as AxiosError).response
    if (resp?.status === 504) {
      return 'Error, check that daemon is running'
    }
    if (resp?.status === 401) {
      return 'Error, wrong password'
    }
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
  const { settings, setSettings } = useAppSettings()

  const formik = useFormik({
    initialValues: {
      api: settings.api,
      password: '',
    },
    onSubmit: async (values, actions) => {
      const err = await checkPassword(values.api, values.password)
      if (!err) {
        setSettings({
          api: values.api,
          password: values.password,
          recentApis: {
            ...settings.recentApis,
            [values.api]: { lastUsed: new Date().getTime() },
          },
        })
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

  const recentApis = sortBy(
    Object.entries(settings.recentApis),
    ([_, { lastUsed }]) => -lastUsed
  ).map(([api]) => api)

  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldGroup name="password" formik={formik}>
        <div className="flex flex-col gap-1.5">
          <ControlGroup>
            <FormTextField
              variants={{
                size: 'small',
              }}
              formik={formik}
              name="api"
              placeholder="http://123.4.5.6:9980"
            />
            {recentApis.length > 1 && (
              <DropdownMenu
                trigger={
                  <Button type="button">
                    <RecentlyViewed16 />
                  </Button>
                }
              >
                {recentApis.map((api) => (
                  <DropdownMenuItem
                    key={api}
                    onClick={() => formik.setFieldValue('api', api)}
                  >
                    {api}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            )}
          </ControlGroup>
          <FormTextField
            variants={{
              size: 'small',
            }}
            formik={formik}
            name="password"
            placeholder="Enter password"
            type="password"
          />
          <FormSubmitButton size="small" formik={formik}>
            Unlock
          </FormSubmitButton>
        </div>
      </FieldGroup>
    </form>
  )
}
