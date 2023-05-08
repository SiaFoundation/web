/* eslint-disable react/no-unescaped-entities */
import { Code, ConfigFields } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import React from 'react'

export const scDecimalPlaces = 6

export const initialValues = {
  // contracts
  set: '',
  amount: undefined as BigNumber | undefined,
  allowance: undefined as BigNumber | undefined,
  period: undefined as BigNumber | undefined,
  renewWindow: undefined as BigNumber | undefined,
  download: undefined as BigNumber | undefined,
  upload: undefined as BigNumber | undefined,
  storage: undefined as BigNumber | undefined,
  // hosts
  allowRedundantIPs: false,
  maxDowntimeHours: undefined as BigNumber | undefined,
  // wallet
  defragThreshold: undefined as BigNumber | undefined,
}

export type SettingsData = typeof initialValues

export const fields: ConfigFields<
  typeof initialValues,
  'contracts' | 'hosts' | 'wallet'
> = {
  // contracts
  storage: {
    type: 'number',
    category: 'contracts',
    title: 'Expected storage',
    description: <>The amount of storage you would like to rent in TB.</>,
    units: 'TB',
    validation: {
      required: 'required',
    },
  },
  upload: {
    type: 'number',
    category: 'contracts',
    title: 'Expected upload',
    description: (
      <>The amount of upload bandwidth you plan to use each period in TB.</>
    ),
    units: 'TB/period',
    validation: {
      required: 'required',
    },
  },
  download: {
    type: 'number',
    category: 'contracts',
    title: 'Expected download',
    description: (
      <>The amount of download bandwidth you plan to use each period in TB.</>
    ),
    units: 'TB/period',
    validation: {
      required: 'required',
    },
  },
  allowance: {
    type: 'siacoin',
    category: 'contracts',
    title: 'Allowance',
    description: (
      <>The amount of Siacoin you would like to spend for the period.</>
    ),
    decimalsLimitSc: scDecimalPlaces,
    validation: {
      required: 'required',
    },
  },
  period: {
    type: 'number',
    category: 'contracts',
    title: 'Period',
    description: <>The length of the storage contracts.</>,
    units: 'weeks',
    suggestion: new BigNumber(6),
    suggestionTip: 'Typically 6 weeks.',
    validation: {
      required: 'required',
    },
  },
  renewWindow: {
    type: 'number',
    category: 'contracts',
    title: 'Renew window',
    description: (
      <>
        The number of weeks prior to contract expiration that Sia will attempt
        to renew your contracts.
      </>
    ),
    units: 'weeks',
    decimalsLimit: 6,
    suggestion: new BigNumber(2),
    suggestionTip: 'Typically 2 weeks.',
    validation: {
      required: 'required',
    },
  },
  amount: {
    type: 'number',
    category: 'contracts',
    title: 'Hosts',
    description: <>The number of hosts to create contracts with.</>,
    units: 'hosts',
    decimalsLimit: 0,
    suggestion: new BigNumber(50),
    suggestionTip: 'Typically 50 hosts.',
    validation: {
      required: 'required',
    },
  },
  set: {
    type: 'text',
    category: 'contracts',
    title: 'Contract set',
    description: <>The contract set that autopilot should use.</>,
    placeholder: 'autopilot',
    suggestion: 'autopilot',
    suggestionTip: (
      <>
        The default contract set is <Code>autopilot</Code>, only change this if
        you understand the implications.
      </>
    ),
    validation: {
      required: 'required',
    },
  },

  // hosts
  allowRedundantIPs: {
    type: 'boolean',
    category: 'hosts',
    title: 'Redundant IPs',
    description: (
      <>
        Whether or not to allow forming contracts with multiple hosts in the
        same IP subnet. The subnets used are /16 for IPv4, and /64 for IPv6.
      </>
    ),
    suggestion: false,
    suggestionTip: 'Defaults to off.',
    validation: {},
  },
  maxDowntimeHours: {
    type: 'number',
    category: 'hosts',
    title: 'Max downtime',
    description: (
      <>
        The maximum amount of host downtime that autopilot will tolerate in
        hours.
      </>
    ),
    units: 'hours',
    suggestion: new BigNumber(1440),
    suggestionTip: 'Defaults to 1,440 which is 60 days.',
    validation: {
      required: 'required',
    },
  },

  // wallet
  defragThreshold: {
    type: 'number',
    category: 'wallet',
    title: 'Defrag threshold',
    description: <>The threshold after which autopilot will defrag outputs.</>,
    units: 'outputs',
    suggestion: new BigNumber(1000),
    suggestionTip: 'Defaults to 1,000.',
    validation: {
      required: 'required',
    },
  },
}
