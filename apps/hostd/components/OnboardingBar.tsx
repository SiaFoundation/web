import {
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
import { useSyncStatus } from '../hooks/useSyncStatus'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'
import { useSettings, useWallet } from '@siafoundation/react-hostd'
import BigNumber from 'bignumber.js'
import { humanSiacoin, toHastings } from '@siafoundation/sia-js'
import { useAppSettings } from '@siafoundation/react-core'
import { useVolumes } from '../contexts/volumes'
import useLocalStorageState from 'use-local-storage-state'

export function OnboardingBar() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const { openDialog } = useDialog()
  const { dataset: volumes } = useVolumes()
  const settings = useSettings()
  const wallet = useWallet()
  const [maximized, setMaximized] = useLocalStorageState<boolean>(
    'v0/hostd/onboarding/maximized',
    {
      defaultValue: true,
    }
  )
  const syncStatus = useSyncStatus()

  if (!isUnlockedAndAuthedRoute) {
    return null
  }

  const walletBalance = new BigNumber(wallet.data?.confirmed || 0)
  const minimumBalance = toHastings(5_000)

  const step1Funded = wallet.data && walletBalance.gte(minimumBalance)
  const step2Volumes = volumes?.length > 0
  const step3Configured = settings.data?.acceptingContracts
  const step4Synced = syncStatus.isSynced
  // const step5Announced = false
  const steps = [
    step1Funded,
    step2Volumes,
    step3Configured,
    step4Synced,
    //step5Announced
  ]
  const totalSteps = steps.length
  const completedSteps = steps.filter((step) => step).length

  if (totalSteps === completedSteps) {
    return null
  }

  if (maximized) {
    return (
      <div className="z-20 fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
        <Panel className="w-[400px] flex flex-col max-h-[600px]">
          <ScrollArea>
            <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
              <div className="flex gap-2 items-center">
                <Logo />
                <Text size="20" weight="semibold">
                  Welcome to Sia
                </Text>
              </div>
              <Button variant="ghost" onClick={() => setMaximized(false)}>
                <Subtract24 />
              </Button>
            </div>
            <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
              <Text size="14">
                Get set up by completing the following steps. Once they are
                complete, your host is ready to store data.
              </Text>
            </div>
            <Section
              title={
                <Link
                  href={routes.wallet.view}
                  onClick={() => openDialog('addressDetails')}
                  ellipsis
                  size="14"
                  underline="hover"
                >
                  Step 1: Fund your wallet
                </Link>
              }
              description={`Fund your wallet with at least ${humanSiacoin(
                minimumBalance
              )} siacoin to cover required contract collateral.${
                syncStatus.isWalletSynced
                  ? ''
                  : ' Balance will not be accurate until wallet is finished scanning.'
              }`}
              action={
                step1Funded ? (
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
                  href={routes.volumes.index}
                  ellipsis
                  size="14"
                  underline="hover"
                >
                  Step 2: Add a volume
                </Link>
              }
              description={
                'Add a system volume that will be used to store data.'
              }
              action={
                step2Volumes ? (
                  <Text color="green">
                    <CheckmarkFilled16 />
                  </Text>
                ) : (
                  <>
                    <Link href={routes.volumes.index}>
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
                  href={routes.config.index}
                  ellipsis
                  size="14"
                  underline="hover"
                >
                  Step 3: Configure pricing and settings
                </Link>
              }
              description={`Configure your host's pricing and settings and start accepting contracts.`}
              action={
                step3Configured ? (
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
                  Step 4: Wait for the blockchain to sync
                </Link>
              }
              description={
                'The blockchain will sync in the background, this takes some time. No user action required.'
              }
              action={
                step4Synced ? (
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
          </ScrollArea>
        </Panel>
      </div>
    )
  }
  return (
    <div className="z-30 fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
      <Button
        onClick={() => setMaximized(true)}
        size="large"
        className="flex gap-3 !px-3"
      >
        <Text className="flex items-center gap-1">
          <Logo />
          Setup: {completedSteps}/{totalSteps} steps complete
        </Text>
      </Button>
    </div>
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
