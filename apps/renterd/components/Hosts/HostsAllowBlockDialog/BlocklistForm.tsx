import {
  FormSubmitButtonFormik,
  PoolSelected,
  copyToClipboard,
  ScrollArea,
  Text,
  Separator,
  Tooltip,
  FormTextFieldFormik,
  FieldGroupFormik,
} from '@siafoundation/design-system'
import { ListChecked32, Filter32 } from '@siafoundation/react-icons'
import { useHostsBlocklist } from '@siafoundation/renterd-react'
import { useContracts } from '../../../contexts/contracts'
import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
import { useBlocklistUpdate } from '../../../hooks/useBlocklistUpdate'

const initialValues = {
  address: '',
}

const suggestions = [
  '45.148.30.56',
  '51.158.108.244',
  'siacentral.ddnsfree.com',
  'siacentral.mooo.com',
]

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
})

export function BlocklistForm() {
  const blockListResponse = useHostsBlocklist({
    config: {
      swr: {
        refreshInterval: 60_000,
      },
    },
  })
  const blocklistUpdate = useBlocklistUpdate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const success = await blocklistUpdate([values.address], [])
      if (success) {
        actions.resetForm()
      } else {
        actions.setStatus({ error: 'Error updating blocklist' })
      }
    },
  })

  useEffect(() => {
    formik.setStatus(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])

  const isFiltered = formik.values.address
  const filtered = useMemo(
    () =>
      blockListResponse.data?.filter(
        (a) => !formik.values.address || a.includes(formik.values.address)
      ) || [],
    [blockListResponse.data, formik.values.address]
  )

  const { dataset } = useContracts()
  const suggestionsNotOnList = useMemo(
    () =>
      suggestions
        .filter((s) => !blockListResponse.data?.find((a) => a === s))
        .map((s) => ({
          address: s,
          contractCount: dataset?.filter((d) => d.hostIp === s).length,
        })),
    [blockListResponse.data, dataset]
  )

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 h-[400px]"
    >
      <FieldGroupFormik
        title="Address"
        name="address"
        formik={formik}
        withStatusError
      >
        <div className="flex gap-1">
          <FormTextFieldFormik
            name="address"
            formik={formik}
            placeholder="eg: 51.258.128.144 or spam.ddnsfree.com"
            autoComplete="off"
            variants={{
              size: 'small',
              // className: 'flex-1'
            }}
          />
          <FormSubmitButtonFormik
            formik={formik}
            size="small"
            variant="red"
            withStatusError={false}
          >
            Block address
          </FormSubmitButtonFormik>
        </div>
      </FieldGroupFormik>
      <div className="flex-1 overflow-hidden !-m-2">
        <ScrollArea>
          <div className="p-2">
            {!!suggestionsNotOnList.length && (
              <>
                <div className="flex gap-1 flex-wrap">
                  <Text size="12" color="subtle">
                    Suggestions:
                  </Text>
                  {suggestionsNotOnList.map(({ address, contractCount }, i) => {
                    return (
                      <Text
                        key={address}
                        size="12"
                        underline="hover"
                        className="cursor-pointer"
                        onClick={() => formik.setFieldValue('address', address)}
                      >
                        {address}
                        {!!contractCount && (
                          <>
                            {' '}
                            <Tooltip
                              content={`${contractCount} active contracts`}
                            >
                              <Text color="red">({contractCount})</Text>
                            </Tooltip>
                          </>
                        )}
                        {i !== suggestionsNotOnList.length - 1 && (
                          <Text>,</Text>
                        )}
                      </Text>
                    )
                  })}
                </div>
                <Separator className="my-2" />
              </>
            )}
            {filtered.length ? (
              <div data-testid="blocklistAddresses">
                <PoolSelected
                  options={
                    filtered.map((address) => ({
                      value: address,
                      label: `${address.slice(0, 20)}...`,
                    })) || []
                  }
                  onClick={(value) => copyToClipboard(value, 'blocked address')}
                  onRemove={(value) => blocklistUpdate([], [value])}
                />
              </div>
            ) : isFiltered ? (
              <div className="flex flex-col gap-3 items-center justify-center h-[200px]">
                <Text color="subtle">
                  <Filter32 />
                </Text>
                <Text color="subtle">
                  No existing entries match {formik.values.address}.
                </Text>
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-center justify-center h-[200px]">
                <Text color="subtle">
                  <ListChecked32 />
                </Text>
                <Text color="subtle">The blocklist is empty.</Text>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </form>
  )
}
