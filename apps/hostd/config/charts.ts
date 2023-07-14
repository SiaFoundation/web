import { colors } from '@siafoundation/design-system'

export const chartConfigs = {
  // states
  successful: {
    color: colors.green[600],
  },
  active: {
    color: colors.amber[600],
    // pattern: true,
  },
  pending: {
    color: colors.amber[600],
    pattern: true,
  },
  rejected: {
    color: colors.red[600],
    // pattern: true,
  },
  failed: {
    color: colors.red[600],
  },
  // potential: {
  //   color: colors.amber[600],
  //   pattern: true,
  // },

  // types
  storage: {
    label: 'storage',
    color: colors.emerald[600],
  },
  storagePhysical: {
    color: colors.indigo[600],
  },
  ingress: {
    label: 'ingress',
    color: colors.pink[600],
  },
  egress: {
    label: 'egress',
    color: colors.blue[600],
  },
  registry: {
    label: 'registry',
    color: colors.purple[600],
  },
  storageWrites: {
    label: 'storage write',
    color: colors.pink[600],
  },
  storageReads: {
    label: 'storage read',
    color: colors.blue[600],
  },
  registryReads: {
    label: 'registry reads',
    color: colors.green[600],
  },
  registryWrites: {
    label: 'registry writes',
    color: colors.yellow[600],
  },
  rpc: {
    label: 'RPC',
    color: colors.slate[500],
  },
  capacityStorage: {
    label: 'capacity',
    color: colors.neutral[500],
  },
  capacityRegistry: {
    label: 'capacity',
    color: colors.neutral[500],
  },

  //
  contract: {
    color: colors.red[800],
  },
  collateral: {
    color: colors.amber[600],
  },
  sectorsTemp: {
    label: 'temp sectors',
    color: colors.amber[600],
  },
  sectorsContract: {
    label: 'contract sectors',
    color: colors.green[600],
  },
  sectorAccess: {
    label: 'sector access',
    color: colors.blue[600],
  },

  // general
  sc: {
    color: colors.green[600],
  },
  sf: {
    color: colors.amber[600],
  },

  // collateral
  locked: {
    color: colors.purple[600],
  },
  risked: {
    color: colors.amber[600],
  },
  burnt: {
    color: colors.red[600],
  },
}
