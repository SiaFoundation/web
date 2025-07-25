import { Text, Button, ControlGroup } from '@siafoundation/design-system'
import { Reset16, Save16 } from '@siafoundation/react-icons'
import { useConfig } from '../../contexts/config'
import { ConfigContextMenu } from './ConfigContextMenu'
import { pluralize } from '@siafoundation/units'

export function ConfigActions() {
  const { onSubmit, changeCount, revalidateAndResetForm, form } = useConfig()

  return (
    <div className="flex items-center gap-2">
      {!!changeCount && (
        <Text size="12" color="subtle">
          {pluralize(changeCount, 'change', 'changes')}
        </Text>
      )}
      <Button
        tip="Reset all changes"
        icon="contrast"
        disabled={!changeCount}
        onClick={revalidateAndResetForm}
      >
        <Reset16 />
      </Button>
      <ControlGroup>
        <Button
          tip="Save all changes"
          variant="accent"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          onClick={onSubmit}
        >
          <Save16 />
          Save changes
        </Button>
      </ControlGroup>
      <ConfigContextMenu />
    </div>
  )
}
