import {
  Flex,
  IconButton,
  Search24,
  TextField,
  triggerToast,
} from '@siafoundation/design-system'
import React from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { apiBase } from '../../config'
import { getHrefForType } from '../../lib/utils'
import { EntityType, EntityTypeInfo } from '../../config/types'

export function Search() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: async (values, actions) => {
      const response = await fetch(`${apiBase}/hash/${values.query}`)
      const data: [EntityTypeInfo<EntityType>] = await response.json()

      if (!data?.length) {
        actions.setErrors({
          query: 'Invalid hash',
        })
        triggerToast('Invalid hash')
        return
      }
      actions.resetForm()

      const master = data[0]
      router.push(getHrefForType(master.Type, values.query))
    },
  })

  return (
    <Flex
      justify="center"
      css={{
        flex: 1,
      }}
    >
      <Flex
        as="form"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={formik.handleSubmit as any}
        align="center"
        justify="end"
        gap="1"
        css={{
          width: '100%',
        }}
      >
        <TextField
          size="2"
          placeholder="Search an address, block, transaction, contract ID..."
          name="query"
          spellCheck="false"
          autoComplete="off"
          value={formik.values.query}
          onChange={formik.handleChange}
          state={formik.errors.query ? 'invalid' : undefined}
          css={{
            flex: 1,
            '@bp2': {
              maxWidth: '700px',
            },
          }}
        />
        <IconButton size="2" variant="gray" type="submit">
          <Search24 />
        </IconButton>
      </Flex>
    </Flex>
  )
}
