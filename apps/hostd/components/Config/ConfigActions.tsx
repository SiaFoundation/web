import { Text, Button } from '@siafoundation/design-system'
import { Reset16, Save16 } from '@siafoundation/react-icons'
import { AnnounceButton } from './AnnounceButton'
import { useConfig } from '../../contexts/config'
import { ConfigContextMenu } from './ConfigContextMenu'

export function ConfigActions() {
  const { changeCount, revalidateAndResetForm, form, onSubmit } = useConfig()
  return (
    <div className="flex items-center gap-2">
      {!!changeCount && (
        <Text size="12" color="subtle">
          {changeCount === 1 ? '1 change' : `${changeCount} changes`}
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
      <Button
        tip="Save all changes"
        variant="accent"
        disabled={!form.formState.isDirty || form.formState.isSubmitting}
        onClick={onSubmit}
      >
        <Save16 />
        Save changes
      </Button>
      <AnnounceButton />
      <ConfigContextMenu />
    </div>
  )
}
