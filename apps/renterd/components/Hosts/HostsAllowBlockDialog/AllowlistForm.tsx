import {
  PoolSelected,
  copyToClipboard,
  ScrollArea,
  Text,
  Panel,
  Paragraph,
  FormTextFieldFormik,
  FieldGroupFormik,
  FormSubmitButtonFormik,
} from '@siafoundation/design-system'
import { ListChecked32, Filter32, Warning16 } from '@siafoundation/react-icons'
import { useHostsAllowlist } from '@siafoundation/renterd-react'
import { useAllowlistUpdate } from '../../../hooks/useAllowlistUpdate'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'

const initialValues = {
  publicKey: '',
}

const validationSchema = Yup.object().shape({
  publicKey: Yup.string().required('Required'),
})

export function AllowlistForm() {
  const allowlistResponse = useHostsAllowlist({
    config: {
      swr: {
        refreshInterval: 60_000,
      },
    },
  })
  const allowlistUpdate = useAllowlistUpdate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const success = await allowlistUpdate([values.publicKey], [])
      if (success) {
        actions.resetForm()
      } else {
        actions.setStatus({ error: 'Error updating allowlist' })
      }
    },
  })

  useEffect(() => {
    formik.setStatus(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])

  const isFiltered = formik.values.publicKey
  const filtered =
    allowlistResponse.data?.filter(
      (a) => !formik.values.publicKey || a.includes(formik.values.publicKey)
    ) || []

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 h-[400px]"
    >
      <FieldGroupFormik
        title="Public key"
        name="publicKey"
        formik={formik}
        withStatusError
      >
        <div className="flex gap-1">
          <FormTextFieldFormik
            name="publicKey"
            formik={formik}
            placeholder="ed25519:02aabd26e627fd..."
            autoComplete="off"
            variants={{
              size: 'small',
              // className: 'flex-1'
            }}
          />
          <FormSubmitButtonFormik
            formik={formik}
            size="small"
            variant="amber"
            withStatusError={false}
          >
            Allow public key
          </FormSubmitButtonFormik>
        </div>
      </FieldGroupFormik>
      <Panel className="p-2 flex gap-2 items-center">
        <Text>
          <Warning16 />
        </Text>
        <Paragraph size="12">
          <Text weight="semibold">Caution:</Text> Please note that because the
          allowlist is inclusive, as soon as there are more than zero entries,
          contracting will be limited to only the hosts explicitly on the
          allowlist - all other existing contracts will immediately abort.
        </Paragraph>
      </Panel>
      <div className="flex-1 overflow-hidden !-m-2">
        {filtered.length ? (
          <ScrollArea>
            <div className="p-2" data-testid="allowlistPublicKeys">
              <PoolSelected
                options={
                  filtered.map((publicKey) => ({
                    value: publicKey,
                    label: `${publicKey.slice(0, 20)}...`,
                  })) || []
                }
                onClick={(value) =>
                  copyToClipboard(value, 'allowed public key')
                }
                onRemove={(value) => allowlistUpdate([], [value])}
              />
            </div>
          </ScrollArea>
        ) : isFiltered ? (
          <div className="flex flex-col gap-3 items-center justify-center h-[200px]">
            <Text color="subtle">
              <Filter32 />
            </Text>
            <Text color="subtle">
              No existing entries match {formik.values.publicKey}.
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center justify-center h-[200px]">
            <Text color="subtle">
              <ListChecked32 />
            </Text>
            <Text color="subtle">The allowlist is empty.</Text>
          </div>
        )}
      </div>
    </form>
  )
}
