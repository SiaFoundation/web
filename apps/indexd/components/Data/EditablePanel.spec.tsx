import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  FieldText,
  TooltipProvider,
  type ConfigFields,
} from '@siafoundation/design-system'
import { EditablePanel } from './EditablePanel'

type Values = {
  name: string
}

const fields: ConfigFields<Values, never> = {
  name: {
    type: 'text',
    title: 'Name',
    validation: {},
  },
}

function renderPanel(onSave: (values: Values) => Promise<boolean>) {
  const result = render(
    <TooltipProvider>
      <EditablePanel
        heading="Panel"
        remoteValues={{ name: 'saved' }}
        fields={fields}
        onSave={onSave}
        render={(form, fields) => (
          <FieldText name="name" form={form} fields={fields} />
        )}
      />
    </TooltipProvider>,
  )
  const input = () =>
    result.container.querySelector<HTMLInputElement>('input[name="name"]')!
  // Without onClose or extra actions, the panel's only buttons are reset
  // and save, in that order.
  const resetButton = () =>
    screen.getAllByRole('button')[0] as HTMLButtonElement
  const saveButton = () => screen.getAllByRole('button')[1] as HTMLButtonElement
  return { ...result, input, saveButton, resetButton }
}

async function editName(input: HTMLInputElement, value: string) {
  const user = userEvent.setup()
  await user.clear(input)
  await user.type(input, value)
  return user
}

// The panel's scroll area needs ResizeObserver, which jsdom does not have.
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {
      return
    }
    unobserve() {
      return
    }
    disconnect() {
      return
    }
  }
})

describe('EditablePanel', () => {
  it('starts with the remote values and nothing to save', async () => {
    const { input, saveButton, resetButton } = renderPanel(async () => true)
    await waitFor(() => expect(input().value).toBe('saved'))
    expect(screen.queryByText(/change/)).toBeNull()
    expect(saveButton().disabled).toBe(true)
    expect(resetButton().disabled).toBe(true)
  })

  it('clears the changes when the save succeeds', async () => {
    const onSave = jest.fn(async (_values: Values) => true)
    const { input, saveButton, resetButton } = renderPanel(onSave)
    await waitFor(() => expect(input().value).toBe('saved'))

    const user = await editName(input(), 'edited')
    expect(screen.getByText('1 change')).toBeTruthy()
    await user.click(saveButton())

    await waitFor(() => expect(screen.queryByText('1 change')).toBeNull())
    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave.mock.calls[0][0]).toEqual({ name: 'edited' })
    expect(input().value).toBe('edited')
    expect(saveButton().disabled).toBe(true)
    expect(resetButton().disabled).toBe(true)
  })

  it('keeps the changes when the save fails', async () => {
    const onSave = jest.fn(async (_values: Values) => false)
    const { input, saveButton, resetButton } = renderPanel(onSave)
    await waitFor(() => expect(input().value).toBe('saved'))

    const user = await editName(input(), 'edited')
    await user.click(saveButton())

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))
    // Wait for the submit to settle before checking the form.
    await waitFor(() => expect(saveButton().disabled).toBe(false))
    expect(screen.getByText('1 change')).toBeTruthy()
    expect(input().value).toBe('edited')
    expect(resetButton().disabled).toBe(false)
  })

  it('can retry a failed save', async () => {
    const onSave = jest
      .fn<Promise<boolean>, [Values]>()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
    const { input, saveButton } = renderPanel(onSave)
    await waitFor(() => expect(input().value).toBe('saved'))

    const user = await editName(input(), 'edited')
    await user.click(saveButton())
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(saveButton().disabled).toBe(false))

    await user.click(saveButton())
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(2))
    expect(onSave.mock.calls[1][0]).toEqual({ name: 'edited' })
    await waitFor(() => expect(screen.queryByText('1 change')).toBeNull())
  })

  it('can reset to the remote values after a failed save', async () => {
    const onSave = jest.fn(async (_values: Values) => false)
    const { input, saveButton, resetButton } = renderPanel(onSave)
    await waitFor(() => expect(input().value).toBe('saved'))

    const user = await editName(input(), 'edited')
    await user.click(saveButton())
    await waitFor(() => expect(saveButton().disabled).toBe(false))

    await user.click(resetButton())
    await waitFor(() => expect(input().value).toBe('saved'))
    expect(screen.queryByText('1 change')).toBeNull()
    expect(saveButton().disabled).toBe(true)
  })
})
