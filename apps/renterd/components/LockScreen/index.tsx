import {
  Panel,
  Separator,
  Text,
  AppUnlockForm,
} from '@siafoundation/design-system'
import { ConsensusState } from '@siafoundation/react-renterd'
import { buildModeEmbed } from '../../config/buildMode'
import { routes } from '../../config/routes'
import { RenterdPublicLayout } from '../RenterdPublicLayout'

export function LockScreen() {
  return (
    <RenterdPublicLayout routes={routes}>
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <Panel className="relative top-[-50px] w-[300px] p-2.5">
          <div className="flex flex-col justify-between h-full">
            <Text font="mono" weight="bold" size="20">
              renterd
            </Text>
            <Separator className="w-full mt-2 mb-3" />
            <AppUnlockForm<ConsensusState>
              endpoint="/bus/consensus/state"
              buildModeEmbed={buildModeEmbed}
              routes={routes}
            />
          </div>
        </Panel>
      </div>
    </RenterdPublicLayout>
  )
}
