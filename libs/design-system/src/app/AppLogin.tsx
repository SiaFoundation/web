import { useAppSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'
import { getRedirectRouteFromQuery } from '../hooks/useMonitorConnAndLock'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useMemo } from 'react'
import { ConfigFields, useOnInvalid } from '../form/configurationFields'
import { FieldText } from '../form/FieldText'
import { FormSubmitButton } from '../components/Form'
import { Separator } from '../core/Separator'
import { Text } from '../core/Text'
import { DropdownMenu, DropdownMenuItem } from '../core/DropdownMenu'
import { RecentlyViewed16, Settings16 } from '../icons/carbon'
import { Button } from '../core/Button'
import { Panel } from '../core/Panel'
import { ControlGroup } from '../core/ControlGroup'
import { sortBy } from 'lodash'

function getDefaultValues(api: string) {
  return {
    api,
    password: '',
  }
}

function getFields({
  allowCustomApi,
}: {
  allowCustomApi: boolean
}): ConfigFields<ReturnType<typeof getDefaultValues>, never> {
  return {
    api: {
      type: 'text',
      title: 'API',
      placeholder: 'http://127.0.0.1:9980',
      validation: {
        validate: {
          required: (value) => !allowCustomApi || !!value || 'API is required',
          url: (value) => {
            try {
              const url = new URL(value)
              return (!!url.protocol && !!url.host) || 'invalid API URL'
            } catch (e) {
              return 'invalid API URL'
            }
          },
          https: (value) => {
            const isHttps = window.location.protocol === 'https:'
            return (
              !isHttps ||
              (isHttps && value.startsWith('https')) ||
              'API must use HTTPS'
            )
          },
        },
      },
    },
    password: {
      type: 'password',
      title: 'Password',
      placeholder: 'Enter password',
      validation: {
        required: 'password is required',
      },
    },
  }
}

async function checkPassword({
  api,
  route,
  password,
}: {
  api: string
  route: string
  password: string
}): Promise<{ error?: string }> {
  try {
    await axios.get<Response>(`${api}/api${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`:${password}`),
      },
      timeout: 10_000,
    })
    return {}
  } catch (e: unknown) {
    const code = (e as AxiosError).code
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
    if (code === 'ECONNABORTED') {
      return {
        error: 'Error, daemon did not respond',
      }
    }
    return {
      error: 'Error, something went wrong',
    }
  }
}

type Props = {
  appName: string
  route: string
  routes: {
    home: string
    login: string
  }
}

export function AppLogin({ appName, route, routes }: Props) {
  const router = useRouter()
  const { settings, setSettings } = useAppSettings()
  const { allowCustomApi } = settings

  const defaultValues = useMemo(
    () => getDefaultValues(settings.api),
    [settings.api]
  )

  const form = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  // when the API field is toggled off clear any existing errors
  useEffect(() => {
    form.clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowCustomApi])

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      let api = ''
      if (allowCustomApi) {
        const url = new URL(values.api)
        api = `${url.protocol}//${url.host}`
      }
      const { error } = await checkPassword({
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
        form.reset(defaultValues)
        router.push(getRedirectRouteFromQuery(router, routes))
      } else {
        form.setError('password', {
          message: error,
        })
      }
    },
    [
      allowCustomApi,
      form,
      router,
      routes,
      settings,
      setSettings,
      defaultValues,
      route,
    ]
  )

  const fields = getFields({ allowCustomApi })
  const onInvalid = useOnInvalid(fields)

  const error = form.formState.errors.api || form.formState.errors.password

  const recentApis = sortBy(
    Object.entries(settings.recentApis),
    ([_, { lastUsed }]) => -lastUsed
  ).map(([api]) => api)

  const api = form.watch('api')
  console.log(api)
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full">
      <Panel className="relative top-[-50px] w-[300px] p-2.5">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center">
            <Text font="mono" weight="bold" size="20">
              {appName}
            </Text>
            <DropdownMenu
              trigger={
                <Button icon="hover" variant="ghost">
                  <Settings16 />
                </Button>
              }
            >
              <DropdownMenuItem
                onSelect={() =>
                  setSettings({
                    allowCustomApi: !allowCustomApi,
                  })
                }
              >
                {allowCustomApi ? 'Hide custom API' : 'Show custom API'}
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
          <Separator className="w-full mt-2 mb-3" />
          <form onSubmit={form.handleSubmit(onValid, onInvalid)}>
            <div className="flex flex-col gap-1.5">
              {allowCustomApi ? (
                <ControlGroup>
                  <FieldText
                    name="api"
                    form={form}
                    field={fields.api}
                    group={false}
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
                          onSelect={() => form.setValue('api', api)}
                        >
                          {api}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenu>
                  )}
                </ControlGroup>
              ) : null}
              <FieldText
                name="password"
                form={form}
                field={fields.password}
                group={false}
              />
              {error && (
                <Text size="14" color="red">
                  {error.message}
                </Text>
              )}
              <FormSubmitButton size="small" form={form}>
                Unlock
              </FormSubmitButton>
            </div>
          </form>
        </div>
      </Panel>
    </div>
  )
}
