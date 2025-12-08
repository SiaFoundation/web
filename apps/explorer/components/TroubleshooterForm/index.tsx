'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
  Button,
  ConfigFields,
  FieldText,
  FormSubmitButton,
  Heading,
  Panel,
  Text,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { to } from '@siafoundation/request'

import { network } from '../../config/index'
import { routes } from '../../config/routes'
import { useApi } from '../../contexts/api'

import { ContentLayout } from '../ContentLayout'
import { Launch16 } from '@siafoundation/react-icons'

const defaultValues = {
  query: '',
}

const fields: ConfigFields<typeof defaultValues, never> = {
  query: {
    type: 'text',
    title: 'Host Pubkey',
    placeholder: 'ed25519:707d18...',
    validation: {
      required: 'Please input a valid host public key',
      minLength: {
        value: 72,
        message: 'Valid host public keys are 72 characters long',
      },
    },
  },
}

export function TroubleshooterForm() {
  const router = useRouter()
  const { explored } = useApi()

  const form = useForm({
    defaultValues: defaultValues,
  })

  const onSubmit = useCallback(
    async (values: { query: string }) => {
      // Check that this host is on this network.
      const [host, hostError, hostResponse] = await to(
        explored.hostByPubkey({
          params: { id: values.query },
        }),
      )

      if (!host || hostResponse.status === 404) {
        triggerErrorToast({
          title: 'Host not found.',
          body: 'Make sure you are on the correct network.',
        })
        return
      }

      if (hostError || hostResponse.status !== 200) {
        triggerErrorToast({
          title: 'Host request failed.',
          body: 'Please try again later.',
        })
        return
      }

      // We do not setIsFetching false here to prevent multiple requests.
      router.push(routes.troubleshoot.view.replace(':id', host.publicKey))
    },
    [explored, router],
  )

  return (
    <ContentLayout className="mt-4 min-h-[70vh]">
      <Panel
        className="w-full p-4 flex flex-col gap-6"
        data-testid="explorer-troubleshooter-form"
      >
        <div className="flex flex-col sm:flex-row-reverse justify-between sm:items-start gap-4 sm:gap-0">
          <div className="flex justify-end sm:justify-normal">
            <a
              href={
                network === 'mainnet'
                  ? 'https://www.zen.siascan.com/troubleshoot'
                  : 'https://www.siascan.com/troubleshoot'
              }
            >
              <Button variant="active" className="flex items-center gap-1">
                <Text noWrap>
                  {network === 'mainnet' ? 'zen' : 'mainnet'} troubleshooter
                </Text>
                <Launch16 />
              </Button>
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <Heading size="32">
              {network[0].toUpperCase() + network.slice(1)} Host Troubleshooter
            </Heading>
            <Text className="md:max-w-[95%] text-[14px] sm:text-[16px]">
              The host troubleshooter tool checks protocol connectivity,
              version, and settings configuration for possible issues. Ensure
              that you are on the correct network and input a valid public key.
            </Text>
          </div>
        </div>
        <form
          id="hostKey-form"
          className="flex flex-col sm:flex-row gap-4 items-end"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <FieldText
              data-testid="explorer-troubleshooter-input"
              size="medium"
              spellCheck={false}
              autoComplete="off"
              form={form}
              name="query"
              state={false}
              fields={fields}
              group={true}
            />
          </div>
          <FormSubmitButton
            form={form}
            variant="accent"
            className="min-h-[40px] w-full sm:w-[200px]"
          >
            <Text
              size="16"
              color="none"
              data-testid="explorer-troubleshooter-submit"
            >
              Check Host
            </Text>
          </FormSubmitButton>
        </form>
      </Panel>
    </ContentLayout>
  )
}
