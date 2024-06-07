import {
  Text,
  Button,
  Switch,
  ControlGroup,
  Popover,
  Label,
  Paragraph,
} from '@siafoundation/design-system'
import { Reset16, Save16, Settings16 } from '@siafoundation/react-icons'
import { useConfig } from '../../contexts/config'
import { ConfigContextMenu } from './ConfigContextMenu'
import { ConfigViewDropdownMenu } from './ConfigViewDropdownMenu'

export function ConfigActions() {
  const {
    onSubmit,
    changeCount,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    revalidateAndResetForm,
    form,
  } = useConfig()

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
        <Popover
          contentProps={{
            align: 'end',
          }}
          trigger={
            <Button variant="accent" icon="hover">
              <Settings16 />
            </Button>
          }
        >
          <div className="px-1">
            <Label>Options</Label>
            <div>
              <Switch
                checked={shouldSyncDefaultContractSet}
                onCheckedChange={(val) => setShouldSyncDefaultContractSet(val)}
              >
                sync default contract set
              </Switch>
              <Paragraph size="12">
                Automatically update the default contract set to be the same as
                the autopilot contract set when changes are saved.
              </Paragraph>
            </div>
          </div>
        </Popover>
      </ControlGroup>
      <ConfigContextMenu />
      <ConfigViewDropdownMenu />
    </div>
  )
}
