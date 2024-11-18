import {
  Button,
  Link,
  Separator,
  Text,
  formSetField,
} from '@siafoundation/design-system'
import {
  CaretUp16,
  CaretDown16,
  Information20,
  CheckmarkFilled20,
  PendingFilled20,
} from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { useConfig } from '../../contexts/config'
import { pluralize } from '@siafoundation/units'
import { HangingNavItem } from './HangingNavItem'

export function Recommendations() {
  const { form, fields, evaluation } = useConfig()
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
      {needsRecommendations && foundRecommendation ? (
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
          {usableHostsAfterRecommendation < hostTarget50 ? (
            <Text size="14" color="subtle">
              The system found recommendations that would increase the number of
              usable hosts from {usableHostsCurrent} to{' '}
              {usableHostsAfterRecommendation} of the ideal {hostTarget50}.
            </Text>
          ) : (
            <Text size="14" color="subtle">
              Follow these recommendations to match with{' '}
              {usableHostsAfterRecommendation} hosts.
            </Text>
          )}
        </>
      ) : (
        <>
          <Separator className="w-full my-1" />
          <Text size="14" color="subtle">
            The system could not find recommendations that would increase the
            usable host count.
          </Text>
        </>
      )}
    </div>
  )

  if (!hasDataToEvaluate) {
    return (
      <HangingNavItem
        testId="recommendations"
        localStorageKey="config/recommendations"
        canMaximizeControls={false}
        tip={tip}
        heading={
          <>
            <Text color="contrast">
              <PendingFilled20 />
            </Text>
            <Text size="16" weight="medium" color="subtle">
              The system will review your configuration once all fields are
              filled
            </Text>
          </>
        }
      />
    )
  }

  const matchingCountEl = (
    <div className="flex gap-1 items-center">
      <Text size="16" weight="medium" color="contrast">
        Matching
      </Text>
      <Text size="16" weight="medium" color="contrast">
        {usableHostsCurrent}/{hostTarget50}
      </Text>
      <Text size="16" weight="medium" color="contrast">
        hosts
      </Text>
    </div>
  )

  if (!needsRecommendations) {
    return (
      <HangingNavItem
        testId="recommendations"
        localStorageKey="config/recommendations"
        canMaximizeControls={false}
        tip={tip}
        heading={
          <>
            <Text color="green">
              <CheckmarkFilled20 />
            </Text>
            {matchingCountEl}
            <Text size="16" weight="medium">
              Configuration matches with a sufficient number of hosts
            </Text>
          </>
        }
      />
    )
  }

  return (
    <HangingNavItem
      testId="recommendations"
      localStorageKey="config/recommendations"
      tip={tip}
      canMaximizeControls={!!recommendations.length}
      heading={
        <div className="flex gap-2 items-center">
          <Text color="amber">
            <Information20 />
          </Text>
          {matchingCountEl}
          <Text size="16" weight="medium" color="subtle" noWrap>
            {pluralize(recommendations.length, 'recommendation', {
              customZero: 'No recommendations',
            })}{' '}
            to match with more hosts
          </Text>
        </div>
      }
    >
      {foundRecommendation ? (
        <div data-testid="recommendationsList">
          {recommendations.map(
            ({
              hrefId,
              key,
              title,
              currentLabel,
              targetLabel,
              targetValue,
              direction,
            }) => (
              <Section
                key={key}
                testId={key}
                title={
                  <Text size="14">
                    {direction === 'up' ? 'Increase ' : 'Decrease '}
                    <Link
                      href={routes.config.index + '#' + hrefId}
                      size="14"
                      underline="hover"
                    >
                      {title}
                    </Link>{' '}
                    from {currentLabel} to{' '}
                    <Button
                      size="none"
                      onClick={() =>
                        formSetField({
                          form,
                          fields,
                          name: key,
                          value: targetValue,
                          options: true,
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
        </div>
      ) : null}
    </HangingNavItem>
  )
}

type SectionProps = {
  title: React.ReactNode
  action: React.ReactNode
  testId: string
}

function Section({ testId, title, action }: SectionProps) {
  return (
    <div
      data-testid={testId}
      className="border-t first:border-t-0 border-gray-200 dark:border-graydark-100 px-3 py-2"
    >
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex items-center">{title}</div>
        {action}
      </div>
    </div>
  )
}
