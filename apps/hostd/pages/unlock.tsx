import {
  Panel,
  Separator,
  Text,
  AppPublicLayout,
  AppUnlockForm,
} from '@siafoundation/design-system'
import { StateConsensus } from '@siafoundation/react-hostd'
import { buildModeEmbed } from '../config/buildMode'
import { connectivityRoute, routes } from '../config/routes'

export default function Unlock() {
  return (
    <AppPublicLayout
      appName="hostd"
      connectivityRoute={connectivityRoute}
      routes={routes}
    >
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <Panel className="relative top-[-50px] w-[300px] p-4">
          <div className="flex flex-col gap-4">
            <Text font="mono" weight="bold" size="20">
              hostd
            </Text>
            <Separator className="w-full" />
            <AppUnlockForm<StateConsensus>
              route={connectivityRoute}
              buildModeEmbed={buildModeEmbed}
              routes={routes}
            />
          </div>
        </Panel>
      </div>
    </AppPublicLayout>
  )
}
