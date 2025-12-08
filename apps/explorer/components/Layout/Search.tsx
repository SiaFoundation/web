'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

import {
  Button,
  ConfigFields,
  ControlGroup,
  FieldText,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { Search16 } from '@siafoundation/react-icons'
import { to } from '@siafoundation/request'

import { routes } from '../../config/routes'
import { useApi } from '../../contexts/api'

const defaultValues = {
  query: '',
}

const fields: ConfigFields<typeof defaultValues, never> = {
  query: {
    type: 'text',
    title: 'Query',
    placeholder: 'Search by host, address, block, transaction, contract ID...',
    validation: {
      required: 'required',
    },
  },
}

export function Search() {
  const router = useRouter()

  const form = useForm({
    defaultValues,
  })

  const { explored } = useApi()

  const onSubmit = useCallback(
    async (values: { query: string }) => {
      // Catch possible block number, avoid request, go there.
      if (!isNaN(Number(values.query.replace(',', '')))) {
        router.push(
          routes.block.view.replace(':id', values.query.replace(',', '')),
        )
        form.reset()
        return
      }

      // Catch possible host pubkey, avoid request, go there.
      if (values.query.slice(0, 8) === 'ed25519:') {
        router.push(routes.host.view.replace(':id', values.query))
        form.reset()
        return
      }

      // Catch possible host address, make a different request, go there.
      if (values.query.includes(':')) {
        const [hostSearch, hostSearchError] = await to(
          explored.hostsList({
            params: { sortBy: 'net_address', dir: 'asc' },
            data: { netAddresses: [values.query] },
          }),
        )

        if (hostSearchError)
          return triggerErrorToast({
            title: 'Request failed. Try again later.',
          })

        if (!hostSearch || !hostSearch.length)
          return triggerErrorToast({
            title: 'Host not found. Make sure to include port.',
          })

        // If we have more than one result, it could be due to a malicious
        // host announcement or remap of the DNS. In either case, we
        // should narrow the user into searching by public key.
        if (hostSearch.length > 1) {
          triggerErrorToast({
            title: "Multiple results found. Please use this host's public key.",
          })
          form.reset()
          return
        }

        router.push(routes.host.view.replace(':id', hostSearch[0].publicKey))
        form.reset()
        return
      }

      const [searchType, searchTypeError, searchTypeResponse] = await to(
        explored.searchResultType({
          params: { id: values.query.toLowerCase() },
        }),
      )

      if (!searchType || searchTypeResponse.status === 404) {
        form.setError('query', { message: 'No element with that ID found.' })
        triggerErrorToast({ title: 'No element with that ID found.' })
        return
      }

      if (searchTypeError) {
        form.setError('query', { message: 'Request failed. Try again later.' })
        triggerErrorToast({ title: 'Request failed. Try again later.' })
        return
      }

      switch (searchType) {
        case 'address':
          router.push(routes.address.view.replace(':id', values.query))
          break
        case 'block':
          router.push(routes.block.view.replace(':id', values.query))
          break
        case 'contract':
        case 'v2Contract':
          router.push(routes.contract.view.replace(':id', values.query))
          break
        case 'host':
          router.push(routes.host.view.replace(':id', values.query))
          break
        case 'transaction':
        case 'v2Transaction':
          router.push(routes.transaction.view.replace(':id', values.query))
          break
        case 'siacoinElement':
        case 'siafundElement':
          router.push(routes.output.view.replace(':id', values.query))
          break
        case 'invalid':
          form.setError('query', {
            message: 'Invalid request.',
          })
          triggerErrorToast({ title: 'Invalid request.' })
          return
        default:
          form.setError('query', {
            message: 'Type not currently supported.',
          })
          triggerErrorToast({ title: 'Type not currently supported.' })
          return
      }

      form.reset()
    },
    [form, router, explored],
  )

  return (
    <div className="flex gap-1 justify-center flex-1">
      <form
        className="flex gap-2 items-center justify-end w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ControlGroup className="flex-1 md:max-w-[700px]">
          <FieldText
            size="medium"
            spellCheck={false}
            autoComplete="off"
            form={form}
            name="query"
            state={false}
            fields={fields}
            group={false}
          />
          <Button size="medium" variant="gray" type="submit">
            <Search16 />
          </Button>
        </ControlGroup>
      </form>
    </div>
  )
}
