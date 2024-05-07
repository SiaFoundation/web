import {
  Button,
  HoverCard,
  Link,
  ScrollArea,
  Separator,
  Text,
} from '@siafoundation/design-system'
import {
  Subtract24,
  Add24,
  CaretUp16,
  CaretDown16,
  Information20,
  CheckmarkFilled20,
  PendingFilled20,
} from '@siafoundation/react-icons'
import { useApp } from '../../contexts/app'
import { routes } from '../../config/routes'
import useLocalStorageState from 'use-local-storage-state'
import { useConfig } from '../../contexts/config'
import { cx } from 'class-variance-authority'

export function Recommendations() {
  const app = useApp()
  const [maximized, setMaximized] = useLocalStorageState<boolean>(
    'v0/renterd/config/recommendations',
    {
      defaultValue: true,
    }
  )

  const { form, evaluation } = useConfig()
  const {
    hostMargin50,
    hostTarget50,
    hasDataToEvaluate,
    needsRecommendations,
    foundRecommendation,
    recommendations,
    usableHostsCurrent,
    userContractCountTarget,
    usableHostsAfterRecommendation,
  } = evaluation

  if (app.autopilot.status !== 'on') {
    return null
  }

  const tip = (
    <div className="flex flex-col gap-1 px-3 py-2">
      <Text size="14" color="subtle">
        It is best practice to have settings that match with about{' '}
        {(hostMargin50 * 100).toFixed(0)}% more hosts than necessary in case
        some hosts go offline.
      </Text>
      <Separator className="w-full my-1" />
      <div className="flex justify-between items-center">
        <Text size="14" color="subtle">
          Required
        </Text>
        <Text size="14" color="contrast">
          {userContractCountTarget} hosts
        </Text>
      </div>
      <div className="flex justify-between items-center">
        <Text size="14" color="subtle">
          Ideal
        </Text>
        <Text size="14" color="contrast">
          {hostTarget50} hosts
        </Text>
      </div>
      <Separator className="w-full my-1" />
      <div className="flex justify-between items-center">
        <Text size="14" color="subtle">
          Current settings
        </Text>
        <Text size="14" color="contrast">
          {usableHostsCurrent} hosts
        </Text>
      </div>
      {needsRecommendations && (
        <>
          <div className="flex justify-between items-center">
            <Text size="14" color="subtle">
              Recommended settings
            </Text>
            <Text size="14" color="contrast">
              {usableHostsAfterRecommendation} hosts
            </Text>
          </div>
          <Separator className="w-full my-1" />
          {foundRecommendation ? (
            usableHostsAfterRecommendation < hostTarget50 ? (
              <Text size="14" color="subtle">
                The system found recommendations that would increase the number
                of usable hosts from {usableHostsCurrent} to{' '}
                {usableHostsAfterRecommendation} of the ideal {hostTarget50}.
              </Text>
            ) : (
              <Text size="14" color="subtle">
                Follow these recommendations to match with{' '}
                {usableHostsAfterRecommendation} hosts.
              </Text>
            )
          ) : (
            <Text size="14" color="subtle">
              The system could not find recommendations that would increase the
              usable host count.
            </Text>
          )}
        </>
      )}
    </div>
  )

  if (!hasDataToEvaluate) {
    return (
      <Layout
        maximized={maximized}
        setMaximized={setMaximized}
        maximizeControls={false}
        title={
          <>
            <Text color="contrast">
              <PendingFilled20 />
            </Text>
            <Text size="16" weight="medium">
              The system will review your configuration once all fields are
              filled
            </Text>
          </>
        }
      />
    )
  }

  if (!needsRecommendations) {
    return (
      <Layout
        maximized={maximized}
        setMaximized={setMaximized}
        maximizeControls={false}
        tip={tip}
        title={
          <>
            <Text color="green">
              <CheckmarkFilled20 />
            </Text>
            <Text size="16" weight="medium" color="subtle">
              {usableHostsCurrent}/{hostTarget50}
            </Text>
            <Text size="16" weight="medium">
              Configuration matches with a sufficient number of hosts
            </Text>
          </>
        }
      />
    )
  }

  return (
    <Layout
      maximized={maximized}
      setMaximized={setMaximized}
      maximizeControls={!!recommendations.length}
      tip={tip}
      title={
        <>
          <Text color="amber">
            <Information20 />
          </Text>
          <Text size="16" weight="medium" color="subtle">
            {usableHostsCurrent}/{hostTarget50}
          </Text>
          <Text size="16" weight="medium">
            {recommendations.length === 1
              ? '1 recommendation'
              : `${recommendations.length} recommendations`}{' '}
            to match with more hosts
          </Text>
        </>
      }
    >
      {maximized &&
        foundRecommendation &&
        recommendations.map(
          ({
            key,
            title,
            currentLabel,
            targetLabel,
            targetValue,
            direction,
          }) => (
            <Section
              key={key}
              title={
                <Text size="14">
                  {direction === 'up' ? 'Increase ' : 'Decrease '}
                  <Link
                    href={routes.config.index + '#' + key}
                    size="14"
                    underline="hover"
                  >
                    {title}
                  </Link>{' '}
                  from {currentLabel} to{' '}
                  <Button
                    size="none"
                    onClick={() =>
                      form.setValue(key, targetValue, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  >
                    {targetLabel}
                  </Button>
                </Text>
              }
              action={
                <Text>
                  {direction === 'up' ? <CaretUp16 /> : <CaretDown16 />}
                </Text>
              }
            />
          )
        )}
    </Layout>
  )
}

type SectionProps = {
  title: React.ReactNode
  action: React.ReactNode
}

function Section({ title, action }: SectionProps) {
  return (
    <div className="border-t first:border-t-0 border-gray-200 dark:border-graydark-100 px-3 py-2">
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex items-center">{title}</div>
        {action}
      </div>
    </div>
  )
}

function Layout({
  children,
  maximized,
  setMaximized,
  maximizeControls,
  title,
  tip,
}: {
  children?: React.ReactNode
  maximized: boolean
  setMaximized: (maximized: boolean) => void
  maximizeControls: boolean
  title: React.ReactNode
  tip?: React.ReactNode
}) {
  const el = (
    <div
      className={cx(
        'flex justify-between items-center px-3 py-1.5',
        maximized && children
          ? 'border-b border-gray-200 dark:border-graydark-300'
          : '',
        maximizeControls ? 'cursor-pointer' : ''
      )}
      onClick={() => {
        if (maximizeControls) {
          setMaximized(!maximized)
        }
      }}
    >
      <div className={cx('flex gap-2 items-center')}>{title}</div>
      {maximizeControls && (
        <Button variant="ghost" onClick={() => setMaximized(!maximized)}>
          {maximized ? <Subtract24 /> : <Add24 />}
        </Button>
      )}
    </div>
  )
  return (
    <div className="relative">
      <div className="z-10 absolute top-0 left-1/2 -translate-x-1/2 flex justify-center">
        <div className="w-[600px] flex flex-col max-h-[600px] bg-gray-50 dark:bg-graydark-50 border-b border-x border-gray-300 dark:border-graydark-400 rounded-b">
          <ScrollArea>
            {tip ? <HoverCard trigger={el}>{tip}</HoverCard> : el}
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
