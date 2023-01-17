import {
  Button,
  ControlGroup,
  Search16,
  TextField,
  triggerToast,
} from '@siafoundation/design-system'
import React from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { api } from '../../config'
import { getHrefForType } from '../../lib/utils'
import { NvgEntityType, NvgEntityTypeInfo } from '../../config/navigatorTypes'

export function Search() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: async (values, actions) => {
      const response = await fetch(`${api}/hash/${values.query}`)
      const data: [NvgEntityTypeInfo<NvgEntityType>] = await response.json()

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
    <div className="flex gap-1 justify-center flex-1">
      <form
        className="flex gap-2 items-center justify-end w-full"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={formik.handleSubmit as any}
      >
        <ControlGroup className="flex-1 md:max-w-[700px]">
          <TextField
            size="medium"
            placeholder="Search an address, block, transaction, contract ID..."
            name="query"
            spellCheck="false"
            autoComplete="off"
            value={formik.values.query}
            onChange={formik.handleChange}
            state={formik.errors.query ? 'invalid' : undefined}
          />
          <Button size="medium" variant="gray" type="submit">
            <Search16 />
          </Button>
        </ControlGroup>
      </form>
    </div>
  )
}
