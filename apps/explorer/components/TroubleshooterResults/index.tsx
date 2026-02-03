'use client'

import { useMemo } from 'react'

import {
  Alert,
  Heading,
  LinkButton,
  Panel,
  ProgressBar,
  Text,
  toFixedOrPrecision,
  Tooltip,
  truncate,
  useActiveSiascanExchangeRate,
  ValueCopyable,
} from '@siafoundation/design-system'
import {
  CheckmarkFilled20,
  Error16,
  Error20,
  Information16,
  Warning16,
} from '@siafoundation/react-icons'
import {
  blocksToMonths,
  displayEgressPricePerTBPerMonth,
  displayIngressPricePerTBPerMonth,
  displayStoragePricePerTBPerMonth,
  humanBytes,
  humanSiacoin,
  sectorsToBytes,
} from '@siafoundation/units'

import { useApi } from '../../contexts/api'
import { routes } from '../../config/routes'
import { hastingsToFiat } from '../../lib/currency'
import { TroubleshooterResponse } from '../../lib/troubleshooter'

import { ContentLayout } from '../ContentLayout'
import { ExplorerAccordion } from '../ExplorerAccordion'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { ExplorerCopyableCodeBlock } from '../ExplorerCopyableCodeBlock'
import LoadingCurrency from '../LoadingCurrency'

type ResultsProps = {
  troubleshooterData: TroubleshooterResponse
}

export function TroubleshooterResults({ troubleshooterData }: ResultsProps) {
  const { api } = useApi()
  const exchange = useActiveSiascanExchangeRate({
    api,
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })

  const uniqueWarnings = useMemo(() => {
    const uniqueWarnings: string[] = []
    troubleshooterData.rhp4.forEach((address) => {
      if (!address.warnings) return null
      address.warnings.forEach((error) => {
        if (!uniqueWarnings.includes(error)) {
          uniqueWarnings.push(error)
        }
      })
    })
    return uniqueWarnings
  }, [troubleshooterData])

  const uniqueErrors = useMemo(() => {
    const uniqueErrors: string[] = []
    troubleshooterData.rhp4.forEach((address) => {
      if (!address.errors) return null
      address.errors.forEach((error) => {
        if (!uniqueErrors.includes(error)) {
          uniqueErrors.push(error)
        }
      })
    })
    return uniqueErrors
  }, [troubleshooterData])

  const siamuxRHP4 = troubleshooterData.rhp4.filter(
    (rhp4) => rhp4.netAddress.protocol === 'siamux',
  )[0]

  const settingsDatum: DatumProps[] = useMemo(() => {
    const { settings } = siamuxRHP4
    if (!settings) return []
    return [
      { label: 'version', copyable: false, value: troubleshooterData.version },
      {
        label: 'storage price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayStoragePricePerTBPerMonth({
              price: settings.prices.storagePrice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTBMonth" />
          ),
        comment: displayStoragePricePerTBPerMonth({
          price: settings.prices.storagePrice,
        }),
      },
      {
        label: 'collateral',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayStoragePricePerTBPerMonth({
              price: settings.prices.collateral,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: displayStoragePricePerTBPerMonth({
          price: settings.prices.collateral,
        }),
      },
      {
        label: 'upload price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayIngressPricePerTBPerMonth({
              price: settings.prices.ingressPrice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: displayIngressPricePerTBPerMonth({
          price: settings.prices.ingressPrice,
        }),
      },
      {
        label: 'download price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayEgressPricePerTBPerMonth({
              price: settings.prices.egressPrice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: displayEgressPricePerTBPerMonth({
          price: settings.prices.egressPrice,
        }),
      },
      {
        label: 'max collateral',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            hastingsToFiat(settings.maxCollateral, {
              rate: exchange.rate,
              currency: exchange.currency,
            })
          ) : (
            <LoadingCurrency />
          ),
        comment: humanSiacoin(settings.maxCollateral),
      },
      {
        label: 'max duration',
        copyable: false,
        value: `${toFixedOrPrecision(
          blocksToMonths(settings.maxContractDuration),
          {
            digits: 2,
          },
        )} months`,
        comment: `${settings.maxContractDuration} blocks`,
      },
    ]
  }, [exchange, siamuxRHP4, troubleshooterData.version])

  return (
    <ContentLayout className="w-full flex flex-col justify-center items-start gap-4">
      <Panel
        className="w-full p-8 flex flex-col gap-6"
        data-testid="explorer-troubleshooter-results"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2 shrink-0">
            <Heading size="32">Troubleshooter results</Heading>
            <Text color="subtle">
              {truncate(troubleshooterData.publicKey, 24)}
            </Text>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-end gap-2">
            <LinkButton
              variant="active"
              className="w-full sm:w-fit"
              href={routes.troubleshoot.index}
            >
              Check another host
            </LinkButton>
            <LinkButton
              variant="accent"
              className="w-full sm:w-fit"
              href={routes.host.view.replace(
                ':id',
                troubleshooterData.publicKey,
              )}
            >
              <Text size="14" color="none">
                Go to host page
              </Text>
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {!uniqueErrors.length && !uniqueWarnings.length ? (
            <Alert className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Text color="green">
                    <CheckmarkFilled20 />
                  </Text>
                  <Text weight="medium" size="16">
                    No issues found
                  </Text>
                </div>
                <Tooltip content="Host version, protocol connectivity, and configuration look good.">
                  <Information16 className="cursor-pointer" />
                </Tooltip>
              </div>
            </Alert>
          ) : null}
          {uniqueErrors.map((error, index) => {
            return (
              <Alert key={index} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Text color="red">
                      <Error16 />
                    </Text>
                    <Text weight="medium" size="16">
                      Error
                    </Text>
                  </div>
                  <Tooltip content="Errors prevent the host from functioning correctly.">
                    <Information16 className="cursor-pointer" />
                  </Tooltip>
                </div>
                <Text size="14" color="subtle" wrapEllipsis>
                  {error[0].toUpperCase() + error.slice(1)}.
                </Text>
              </Alert>
            )
          })}
          {uniqueWarnings.map((warning, index) => {
            return (
              <Alert key={index} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Text color="amber">
                      <Warning16 />
                    </Text>
                    <Text weight="medium" size="16">
                      Warning
                    </Text>
                  </div>
                  <Tooltip content="Warnings indicate a potential issue with a host.">
                    <Information16 className="cursor-pointer" />
                  </Tooltip>
                </div>
                <Text size="14" color="subtle" wrapEllipsis>
                  {warning[0].toUpperCase() + warning.slice(1)}.
                </Text>
              </Alert>
            )
          })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6">
          {troubleshooterData.rhp4.map((data) => {
            const { netAddress } = data
            return (
              <div
                key={netAddress.protocol + netAddress.address}
                className="flex justify-between items-center"
              >
                <div className="w-full flex flex-col gap-2">
                  <Text
                    color="subtle"
                    scaleSize="14"
                    ellipsis
                    className="flex-1"
                  >
                    {netAddress.protocol}
                  </Text>
                  <div className="flex justify-between">
                    <ValueCopyable value={netAddress.address} maxLength={21} />
                    {data.connected ? (
                      <Text color="green">
                        <CheckmarkFilled20 />
                      </Text>
                    ) : (
                      <Text color="red">
                        <Error20 />
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          {settingsDatum.map(
            (item) => item && <ExplorerDatum key={item.label} {...item} />,
          )}
          {siamuxRHP4.settings ? (
            <div className="flex flex-col gap-2">
              <ExplorerDatum
                label="remaining storage"
                value={humanBytes(
                  sectorsToBytes(siamuxRHP4.settings.remainingStorage),
                )}
                comment={humanBytes(
                  sectorsToBytes(siamuxRHP4.settings.totalStorage),
                )}
                copyable={false}
              />
              <ProgressBar
                variant="accent"
                value={Math.round(
                  ((siamuxRHP4.settings.totalStorage -
                    siamuxRHP4.settings.remainingStorage) /
                    siamuxRHP4.settings.totalStorage) *
                    100,
                )}
              />
            </div>
          ) : null}
        </div>
      </Panel>
      <ExplorerAccordion title="JSON">
        <div className="p-2">
          <ExplorerCopyableCodeBlock
            value={JSON.stringify(troubleshooterData, null, 2)}
          />
        </div>
      </ExplorerAccordion>
    </ContentLayout>
  )
}

type RateLimitProps = {
  message: string
}

export function TroubleshooterRateLimit({ message }: RateLimitProps) {
  return (
    <ContentLayout className="w-full flex flex-col justify-center items-start gap-4">
      <Panel
        className="mx-auto w-md px-8 py-16 flex flex-col gap-6"
        data-testid="explorer-troubleshooter-results"
      >
        <Heading>Rate limited</Heading>
        <Text>{message[0].toUpperCase() + message.slice(1)}</Text>
        <div className="w-full flex justify-end">
          <LinkButton
            variant="accent"
            className="w-full p-4"
            href={routes.troubleshoot.index}
          >
            <Text size="16" color="none">
              Back to search
            </Text>
          </LinkButton>
        </div>
      </Panel>
    </ContentLayout>
  )
}
