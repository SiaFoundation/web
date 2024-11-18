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

  const onSubmit = useCallback(async (values) => {}, [form, router, search])

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
