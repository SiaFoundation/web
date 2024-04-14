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
import { useSiaCentralSearch } from '@siafoundation/sia-central-react'
import { routes } from '../../config/routes'
import { siaCentralApi } from '../../config'

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

  const search = useSiaCentralSearch({
    api: siaCentralApi,
  })

  const onSubmit = useCallback(
    async (values) => {
      const response = await search.get({
        params: {
          query: values.query.toLowerCase(),
        },
      })

      if (!response.data) {
        form.setError('query', { message: 'Error connecting to server.' })
        triggerErrorToast({ title: 'Error connecting to server' })
        return
      }

      if (response.data.blocks?.length) {
        router.push(
          routes.block.view.replace(
            ':id',
            String(response.data.blocks[0].height)
          )
        )
        form.reset()
      } else if (response.data.transactions?.length) {
        router.push(
          routes.transaction.view.replace(
            ':id',
            response.data.transactions[0].id
          )
        )
        form.reset()
      } else if (response.data.contracts?.length) {
        router.push(
          routes.contract.view.replace(':id', response.data.contracts[0].id)
        )
        form.reset()
      } else if (response.data.unlock_hashes?.length) {
        router.push(
          routes.address.view.replace(
            ':id',
            response.data.unlock_hashes[0].address
          )
        )
        form.reset()
      } else if (response.data.hosts?.length) {
        router.push(
          routes.host.view.replace(':id', response.data.hosts[0].public_key)
        )
        form.reset()
      } else {
        form.setError('query', { message: 'No results match query.' })
        triggerErrorToast({ title: 'No results match query' })
      }
    },
    [form, router, search]
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
