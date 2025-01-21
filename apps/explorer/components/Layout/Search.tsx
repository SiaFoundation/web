'use client'

import {
  Button,
  ConfigFields,
  ControlGroup,
  FieldText,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { Search16 } from '@siafoundation/react-icons'
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { routes } from '../../config/routes'
import { explored } from '../../config/explored'
import { to } from '@siafoundation/request'

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

  const onSubmit = useCallback(
    async (values: { query: string }) => {
      // Catch possible block number, avoid request, go there.
      if (!isNaN(Number(values.query.replace(',', '')))) {
        router.push(
          routes.block.view.replace(':id', values.query.replace(',', ''))
        )
        form.reset()
        return
      }

      // Catch possible host pubkey, avoid request, go there.
      if (values.query.slice(0, 7) === 'ed25519') {
        router.push(routes.host.view.replace(':id', values.query))
        form.reset()
        return
      }

      const [searchType, searchTypeError] = await to(
        explored.searchResultType({
          params: { id: values.query.toLowerCase() },
        })
      )

      if (!searchType || searchTypeError) {
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
          router.push(routes.contract.view.replace(':id', values.query))
          break
        case 'host':
          router.push(routes.host.view.replace(':id', values.query))
          break
        case 'transaction':
          router.push(routes.transaction.view.replace(':id', values.query))
          break
        case 'invalid':
          form.setError('query', {
            message: 'Invalid request.',
          })
          triggerErrorToast({ title: 'Invalid request.' })
          return
        default:
          form.setError('query', {
            message: 'Not currently supported.',
          })
          triggerErrorToast({ title: 'Not currently supported.' })
          return
      }

      form.reset()
    },
    [form, router]
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
