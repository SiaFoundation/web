import BigNumber from 'bignumber.js'
import * as Yup from 'yup'

export const scDecimalPlaces = 6
export const dnsProviderOptions = [
  {
    value: '',
    label: 'Off',
  },
  {
    value: 'route53',
    label: 'Route 53',
  },
  {
    value: 'noip',
    label: 'No-IP',
  },
  {
    value: 'duckdns',
    label: 'Duck DNS',
  },
]

export const validationSchema = Yup.object().shape({
  // Host settings
  acceptingContracts: Yup.bool().required('required'),
  netAddress: Yup.string().required('required'),
  maxContractDuration: Yup.mixed().required('required'),
  windowSize: Yup.mixed().required('required'),

  // Pricing
  contractPrice: Yup.mixed().required('required'),
  baseRPCPrice: Yup.mixed().required('required'),
  sectorAccessPrice: Yup.mixed().required('required'),

  collateral: Yup.mixed().required('required'),
  maxCollateral: Yup.mixed().required('required'),

  minStoragePrice: Yup.mixed().required('required'),
  minEgressPrice: Yup.mixed().required('required'),
  minIngressPrice: Yup.mixed().required('required'),

  priceTableValidity: Yup.mixed().required('required'),

  // Registry settings
  maxRegistryEntries: Yup.mixed().required('required'),

  // RHP3 settings
  accountExpiry: Yup.mixed().required('required'),
  maxAccountBalance: Yup.mixed().required('required'),

  // Bandwidth limiter settings
  ingressLimit: Yup.mixed().required('required'),
  egressLimit: Yup.mixed().required('required'),

  // DNS settings
  dnsProvider: Yup.string().oneOf(
    dnsProviderOptions.map((o) => o.value),
    'required'
  ),
  dnsIpv4: Yup.bool().required('required'),
  dnsIpv6: Yup.bool().required('required'),

  // dnsOptions: {} as Record<string, unknown>,
})

export const initialValues = {
  // Host settings
  acceptingContracts: false,
  netAddress: '',
  maxContractDuration: undefined as BigNumber | undefined,
  windowSize: undefined as BigNumber | undefined,

  // Pricing
  contractPrice: undefined as BigNumber | undefined,
  baseRPCPrice: undefined as BigNumber | undefined,
  sectorAccessPrice: undefined as BigNumber | undefined,

  collateral: undefined as BigNumber | undefined,
  maxCollateral: undefined as BigNumber | undefined,

  minStoragePrice: undefined as BigNumber | undefined,
  minEgressPrice: undefined as BigNumber | undefined,
  minIngressPrice: undefined as BigNumber | undefined,

  priceTableValidity: undefined as BigNumber | undefined,

  // Registry settings
  maxRegistryEntries: undefined as BigNumber | undefined,

  // RHP3 settings
  accountExpiry: undefined as BigNumber | undefined,
  maxAccountBalance: undefined as BigNumber | undefined,

  // Bandwidth limiter settings
  ingressLimit: undefined as BigNumber | undefined,
  egressLimit: undefined as BigNumber | undefined,

  // DNS settings
  dnsProvider: '',
  dnsIpv4: false,
  dnsIpv6: false,
  dnsOptions: {} as Record<string, unknown>,
}

export type SettingsData = typeof initialValues

export const descriptions = {
  // Host settings
  acceptingContracts: <>Whether or not the host is accepting contracts.</>,
  netAddress: <>The network address of the host.</>,
  maxContractDuration: (
    <>The maximum contract duration that the host will accept.</>
  ),
  windowSize: <>The contract proof window size in days.</>,
  // Pricing
  contractPrice: <>{`The host's contract price in siacoins.`}</>,
  baseRPCPrice: (
    <>{`The host's base RPC price in siacoins per million calls.`}</>
  ),
  sectorAccessPrice: (
    <>{`The host's sector access price in siacoins million sectors.`}</>
  ),

  collateral: <>{`The host's target collateral in siacoins per month.`}</>,
  maxCollateral: <>{`The host's maximum collateral in siacoins.`}</>,

  minStoragePrice: (
    <>{`The host's minimum storage price in siacoins per TB per month.`}</>
  ),
  minEgressPrice: <>{`The host's minimum egress price in siacoins per TB.`}</>,
  minIngressPrice: (
    <>{`The host's minimum ingress price in siacoins per TB.`}</>
  ),

  priceTableValidity: (
    <>{`How long a renter's registered price table remains valid.`}</>
  ),

  // Registry settings
  maxRegistryEntries: (
    <>{`The maximum number of registry entries that the host will store. Each registry entry is up to 113 bytes.`}</>
  ),

  // RHP3 settings
  accountExpiry: (
    <>{`How long a renter's ephemeral accounts are inactive before the host prunes them and recovers the remaining funds.`}</>
  ),
  maxAccountBalance: (
    <>{`Maximum balance a renter's ephemeral account can have. When the limit is reached, deposits are rejected until some of the funds have been spent.`}</>
  ),

  // Bandwidth limiter settings
  ingressLimit: <>The maximum amount of ingress bandwidth traffic in TB.</>,
  egressLimit: <>The maximum amount of egress bandwidth traffic in TB.</>,

  // DNS settings
  dnsProvider: <>Enable dynamic DNS with one of the supported providers.</>,
  dnsIpv4: <>Whether IPv4 is enabled.</>,
  dnsIpv6: <>Whether IPv6 is enabled.</>,
  dnsOptions: '',
}
