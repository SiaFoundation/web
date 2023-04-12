import {
  Panel,
  Separator,
  Text,
  AppUnlockForm,
} from '@siafoundation/design-system'
import { HostState } from '@siafoundation/react-hostd'
import { buildModeEmbed } from '../../config/buildMode'
import { routes } from '../../config/routes'
import { HostdPublicLayout } from '../HostdPublicLayout'

export function LockScreen() {
  return (
    <HostdPublicLayout routes={routes}>
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <Panel className="relative top-[-50px] w-[300px] p-2.5">
          <div className="flex flex-col justify-between h-full">
            <Text font="mono" weight="bold" size="20">
              hostd
            </Text>
            <Separator className="w-full mt-2 mb-3" />
            <AppUnlockForm<HostState>
              route="/state"
              buildModeEmbed={buildModeEmbed}
              routes={routes}
            />
          </div>
        </Panel>
      </div>
    </HostdPublicLayout>
  )
}
