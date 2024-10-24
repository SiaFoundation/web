import {
  AppDockedControl,
  Button,
  Link,
  Logo,
  Panel,
  ScrollArea,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import {
  RadioButton16,
  CheckmarkFilled16,
  Launch16,
  PendingFilled16,
  Subtract24,
} from '@siafoundation/react-icons'
import { useApp } from '../contexts/app'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'
import { useNotEnoughContracts } from './Files/checks/useNotEnoughContracts'
import { useAutopilotConfig, useWallet } from '@siafoundation/renterd-react'
import BigNumber from 'bignumber.js'
import { humanSiacoin } from '@siafoundation/units'
import { useAppSettings } from '@siafoundation/react-core'
import useLocalStorageState from 'use-local-storage-state'

export function OnboardingBar() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const { isAutopilotEnabled, autopilotInfo } = useApp()
  const { openDialog } = useDialog()
  const wallet = useWallet()
  const autopilot = useAutopilotConfig({
    config: {
      swr: {
        errorRetryInterval: 10_000,
      },
    },
  })
  const [maximized, setMaximized] = useLocalStorageState<boolean>(
    'v0/renterd/onboarding/maximized',
    {
      defaultValue: true,
    }
  )

  const syncStatus = useSyncStatus()
  const notEnoughContracts = useNotEnoughContracts()

  if (!isUnlockedAndAuthedRoute || !isAutopilotEnabled) {
    return null
  }

  const walletBalance = new BigNumber(
    wallet.data ? wallet.data.confirmed + wallet.data.unconfirmed : 0
  )
  const allowance = new BigNumber(autopilot.data?.contracts.allowance || 0)

  const step1Configured = autopilotInfo.data?.state?.configured
  const step2Synced = syncStatus.isSynced
  const step3Funded = walletBalance.gt(0)
  const step4Contracts = !notEnoughContracts.active
  const steps = [step1Configured, step2Synced, step3Funded, step4Contracts]
  const totalSteps = steps.length
  const completedSteps = steps.filter((step) => step).length

  if (totalSteps === completedSteps) {
    return <AppDockedControl />
  }

  if (maximized) {
    return (
      <AppDockedControl>
        <div className="flex justify-center">
          <Panel className="w-[400px] flex flex-col max-h-[600px]">
            <ScrollArea>
              <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
                <div className="flex gap-2 items-center">
                  <Logo />
                  <Text size="20" weight="semibold">
                    Welcome to Sia
                  </Text>
                </div>
                <Button
                  aria-label="minimize onboarding wizard"
                  variant="ghost"
                  onClick={() => setMaximized(false)}
                >
                  <Subtract24 />
                </Button>
              </div>
              <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
                <Text size="14">
                  Get set up by completing the following steps. Once they are
                  complete, you can start uploading files.
                </Text>
              </div>
              <Section
                title={
                  <Link
                    href={routes.config.index}
                    ellipsis
                    size="14"
                    underline="hover"
                  >
                    Step 1: Configure your storage settings
                  </Link>
                }
                description={
                  'Specify how much data you plan to store and your target price.'
                }
                action={
                  step1Configured ? (
                    <Text color="green">
                      <CheckmarkFilled16 />
                    </Text>
                  ) : (
                    <>
                      <Link href={routes.config.index}>
                        <Launch16 />
                      </Link>
                      <Text color="amber">
                        <RadioButton16 />
                      </Text>
                    </>
                  )
                }
              />
              <Section
                title={
                  <Link
                    href={routes.node.index}
                    underline="hover"
                    ellipsis
                    size="14"
                  >
                    Step 2: Wait for the blockchain to sync
                  </Link>
                }
                description={
                  'The blockchain will sync in the background, this takes some time. No user action required.'
                }
                action={
                  step2Synced ? (
                    <Text color="green">
                      <CheckmarkFilled16 />
                    </Text>
                  ) : (
                    <>
                      <Text ellipsis size="14">
                        {syncStatus.syncPercent}%
                      </Text>
                      <Text color="amber">
                        <PendingFilled16 />
                      </Text>
                    </>
                  )
                }
              />
              <Section
                title={
                  <Link
                    href={routes.wallet.view}
                    onClick={() => openDialog('addressDetails')}
                    ellipsis
                    size="14"
                    underline="hover"
                  >
                    Step 3: Fund your wallet
                  </Link>
                }
                description={`Fund your wallet with at least ${humanSiacoin(
                  allowance
                )} siacoin to cover the required allowance.${
                  syncStatus.isWalletSynced
                    ? ''
                    : ' Balance will not be accurate until wallet is finished scanning.'
                }`}
                action={
                  step3Funded ? (
                    <Text color="green">
                      <CheckmarkFilled16 />
                    </Text>
                  ) : (
                    <>
                      {!syncStatus.isWalletSynced && (
                        <Tooltip
                          content={`Wallet scanning progress ${syncStatus.walletScanPercent}%`}
                        >
                          <Text size="14">{syncStatus.walletScanPercent}%</Text>
                        </Tooltip>
                      )}
                      <Link
                        href={routes.wallet.view}
                        onClick={() => openDialog('addressDetails')}
                      >
                        <Launch16 />
                      </Link>
                      <Text color="amber">
                        <RadioButton16 />
                      </Text>
                    </>
                  )
                }
              />
              <Section
                title={
                  <Link
                    href={routes.contracts.index}
                    ellipsis
                    size="14"
                    underline="hover"
                  >
                    Step 4: Wait for storage contracts to form
                  </Link>
                }
                description={
                  'Once all other steps are complete, contracts will automatically form. No user action required.'
                }
                action={
                  step4Contracts ? (
                    <Text color="green">
                      <CheckmarkFilled16 />
                    </Text>
                  ) : (
                    <>
                      <Text ellipsis size="14">
                        {notEnoughContracts.count}/{notEnoughContracts.required}
                      </Text>
                      <Text color="amber">
                        <PendingFilled16 />
                      </Text>
                    </>
                  )
                }
              />
            </ScrollArea>
          </Panel>
        </div>
      </AppDockedControl>
    )
  }

  return (
    <AppDockedControl>
      <div className="flex justify-center">
        <Button
          onClick={() => setMaximized(true)}
          size="large"
          className="flex gap-3 !px-3"
        >
          <Text size="14" className="flex items-center gap-1">
            <Logo />
            Setup: {completedSteps}/{totalSteps} steps complete
          </Text>
        </Button>
      </div>
    </AppDockedControl>
  )
}

type SectionProps = {
  title: React.ReactNode
  action: React.ReactNode
  description: React.ReactNode
}

function Section({ title, action, description }: SectionProps) {
  return (
    <div className="border-t first:border-t-0 border-gray-200 dark:border-graydark-300 px-3 py-2">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <div className="flex-1 flex items-center">{title}</div>
          {action}
        </div>
        <div className="pr-5">
          <Text size="12" color="subtle">
            {description}
          </Text>
        </div>
      </div>
    </div>
  )
}
