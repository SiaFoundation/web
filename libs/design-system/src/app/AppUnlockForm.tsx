import { Either, useAppSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { FieldGroup, FormSubmitButton, FormTextField } from '../components/Form'
import axios, { AxiosError } from 'axios'
import { Button } from '../core/Button'
import { RecentlyViewed16 } from '../icons/carbon'
import { ControlGroup } from '../core/ControlGroup'
import { DropdownMenu, DropdownMenuItem } from '../core/DropdownMenu'
import { sortBy } from 'lodash'
import { getRedirectRouteFromQuery } from '../hooks/useMonitorConnAndLock'

type ResponseWithSynced = Either<
  {
    Synced: boolean
  },
  {
    synced: boolean
  }
>

async function checkPassword<Response extends ResponseWithSynced>({
  api,
  route,
  password,
}: {
  api: string
  route: string
  password: string
}): Promise<{ isSynced?: boolean; error?: string }> {
  try {
    const response = await axios.get<Response>(`${api}/api${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`:${password}`),
      },
    })
    return {
      isSynced: response.data.Synced || response.data.synced,
    }
  } catch (e: unknown) {
    const resp = (e as AxiosError).response
    if (resp?.status === 504) {
      return {
        error: 'Error, check that daemon is running',
      }
    }
    if (resp?.status === 401) {
      return {
        error: 'Error, wrong password',
      }
    }
    return {
      error: 'Error, something went wrong',
    }
  }
}

type Props = {
  route: string
  buildModeEmbed: boolean
  routes: {
    home: string
    lockscreen: string
    syncscreen: string
  }
}

export function AppUnlockForm<Response extends ResponseWithSynced>({
  route,
  buildModeEmbed,
  routes,
}: Props) {
  const router = useRouter()
  const { settings, setSettings } = useAppSettings()

  const formik = useFormik({
    initialValues: {
      api: settings.api,
      password: '',
    },
    onSubmit: async (values, actions) => {
      const api = buildModeEmbed ? '' : values.api
      const { isSynced, error } = await checkPassword<Response>({
        api,
        route,
        password: values.password,
      })
      if (!error) {
        setSettings({
          api,
          password: values.password,
          recentApis: {
            ...settings.recentApis,
            [api]: { lastUsed: new Date().getTime() },
          },
        })
        actions.resetForm()
        if (isSynced) {
          router.push(getRedirectRouteFromQuery(router, routes))
        } else {
          router.push(routes.syncscreen)
        }
      } else {
        actions.setErrors({
          password: error,
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
          {buildModeEmbed ? null : (
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
          )}
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
