import { Currency } from './currency'
import { SiaPublicKey } from './signitures'
import { SiacoinOutput, Transaction } from './transactions'
import { ProcessedInput, ProcessedOutput } from './wallet'

// helpers
const maxUnixTSInSeconds = 9999999999

function ParseDate(d: Date | number | string): Date {
  if (d instanceof Date) return d
  if (typeof d === 'number') {
    if (d > maxUnixTSInSeconds) return new Date(d)
    return new Date(d * 1000) // go ts
  }
  return new Date(d)
}

function ParseNumber(v: number | string, isInt = false): number {
  if (!v) return 0
  if (typeof v === 'number') return v
  return (isInt ? parseInt(v) : parseFloat(v)) || 0
}

function FromArray<T>(
  Ctor: { new (v: any): T },
  data?: any[] | any,
  def = null
): T[] | null {
  if (!data || !Object.keys(data).length) return def
  const d = Array.isArray(data) ? data : [data]
  return d.map((v: any) => new Ctor(v))
}

function ToObject(o: any, typeOrCfg: any = {}, child = false): any {
  if (o == null) return null
  if (typeof o.toObject === 'function' && child) return o.toObject()

  switch (typeof o) {
    case 'string':
      return typeOrCfg === 'number' ? ParseNumber(o) : o
    case 'boolean':
    case 'number':
      return o
  }

  if (o instanceof Date) {
    return typeOrCfg === 'string'
      ? o.toISOString()
      : Math.floor(o.getTime() / 1000)
  }

  if (Array.isArray(o)) return o.map((v: any) => ToObject(v, typeOrCfg, true))

  const d: any = {}

  for (const k of Object.keys(o)) {
    const v: any = o[k]
    if (v === undefined) continue
    if (v === null) continue
    d[k] = ToObject(v, typeOrCfg[k] || {}, true)
  }

  return d
}

// structs
// // struct2ts:go.sia.tech/siad/types.Currency
// export interface Currency {
// }

// struct2ts:go.sia.tech/siad/modules.SiaPath
export interface SiaPath {
  path: string
}

// struct2ts:go.sia.tech/siad/modules.MountOptions
export interface MountOptions {
  allowother: boolean
  readonly: boolean
}

// struct2ts:go.sia.tech/siad/modules.MountInfo
export interface MountInfo {
  mountpoint: string
  siapath: SiaPath
  mountoptions: MountOptions
}

// struct2ts:go.sia.tech/siad/node/api.RenterFuseInfo
export interface RenterFuseInfo {
  mountpoints: MountInfo[] | null
}

// struct2ts:go.sia.tech/siad/node/api.RenterUploadedBackup
export interface RenterUploadedBackup {
  name: string
  creationdate: number
  size: number
  uploadprogress: number
}

// struct2ts:go.sia.tech/siad/node/api.RenterBackupsGET
export interface RenterBackupsGET {
  backups: RenterUploadedBackup[] | null
  syncedhosts: SiaPublicKey[] | null
  unsyncedhosts: SiaPublicKey[] | null
}

// // struct2ts:go.sia.tech/siad/modules.ValuedTransaction
// export interface ValuedTransaction {
//   transaction: Transaction
//   transactionid: number[]
//   confirmationheight: number
//   confirmationtimestamp: number
//   inputs: ProcessedInput[] | null
//   outputs: ProcessedOutput[] | null
//   confirmedincomingvalue: Currency
//   confirmedoutgoingvalue: Currency
// }

// // struct2ts:go.sia.tech/siad/modules.ProcessedTransaction
// export interface ProcessedTransaction {
//   transaction: Transaction
//   transactionid: number[]
//   confirmationheight: number
//   confirmationtimestamp: number
//   inputs: ProcessedInput[] | null
//   outputs: ProcessedOutput[] | null
// }

// struct2ts:math/big.Rat
export interface Rat {}

// struct2ts:go.sia.tech/siad/node/api.ConsensusGET
export interface ConsensusGET {
  synced: boolean
  height: number
  currentblock: number[]
  target: number[]
  difficulty: Currency
  foundationprimaryunlockhash: number[]
  foundationfailsafeunlockhash: number[]
  blockfrequency: number
  blocksizelimit: number
  extremefuturethreshold: number
  futurethreshold: number
  genesistimestamp: number
  maturitydelay: number
  mediantimestampwindow: number
  siafundcount: Currency
  siafundportion: Rat | null
  initialcoinbase: number
  minimumcoinbase: number
  roottarget: number[]
  rootdepth: number[]
  siacoinprecision: Currency
}

// struct2ts:go.sia.tech/siad/modules.Peer
export interface Peer {
  inbound: boolean
  local: boolean
  netaddress: string
  version: string
}

// struct2ts:go.sia.tech/siad/node/api.GatewayGET
export interface GatewayGET {
  netaddress: string
  peers: Peer[] | null
  online: boolean
  maxdownloadspeed: number
  maxuploadspeed: number
}

// struct2ts:go.sia.tech/siad/node/api.DaemonVersion
export interface DaemonVersion {
  version: string
  gitrevision: string
  buildtime: string
}

// struct2ts:go.sia.tech/siad/node/api.WalletGET
export interface WalletGET {
  encrypted: boolean
  height: number
  rescanning: boolean
  unlocked: boolean
  confirmedsiacoinbalance: Currency
  unconfirmedoutgoingsiacoins: Currency
  unconfirmedincomingsiacoins: Currency
  siacoinclaimbalance: Currency
  siafundbalance: Currency
  dustthreshold: Currency
}

// struct2ts:go.sia.tech/siad/node/api.WalletInitPOST
export interface WalletInitPOST {
  primaryseed: string
}

// // struct2ts:go.sia.tech/siad/types.SiaPublicKey
// export interface SiaPublicKey {
//   algorithm: number[]
//   key: number[] | null
// }

// // struct2ts:go.sia.tech/siad/types.UnlockConditions
// export interface UnlockConditions {
//   timelock: number
//   publickeys: SiaPublicKey[] | null
//   signaturesrequired: number
// }

// // struct2ts:go.sia.tech/siad/types.SiacoinInput
// export interface SiacoinInput {
//   parentid: number[]
//   unlockconditions: UnlockConditions
// }

// // struct2ts:go.sia.tech/siad/types.SiacoinOutput
// export interface SiacoinOutput {
//   value: Currency
//   unlockhash: number[]
// }

// // struct2ts:go.sia.tech/siad/types.FileContract
// export interface FileContract {
// 	filesize: number;
// 	filemerkleroot: number[];
// 	windowstart: number;
// 	windowend: number;
// 	payout: Currency;
// 	validproofoutputs: SiacoinOutput[] | null;
// 	missedproofoutputs: SiacoinOutput[] | null;
// 	unlockhash: number[];
// 	revisionnumber: number;
// }

// // struct2ts:go.sia.tech/siad/types.FileContractRevision
// export interface FileContractRevision {
// 	parentid: number[];
// 	unlockconditions: UnlockConditions;
// 	newrevisionnumber: number;
// 	newfilesize: number;
// 	newfilemerkleroot: number[];
// 	newwindowstart: number;
// 	newwindowend: number;
// 	newvalidproofoutputs: SiacoinOutput[] | null;
// 	newmissedproofoutputs: SiacoinOutput[] | null;
// 	newunlockhash: number[];
// }

// // struct2ts:go.sia.tech/siad/types.StorageProof
// export interface StorageProof {
//   parentid: number[]
//   segment: number[]
//   hashset: Hash[] | null
// }

// // struct2ts:go.sia.tech/siad/types.SiafundInput
// export interface SiafundInput {
//   parentid: number[]
//   unlockconditions: UnlockConditions
//   claimunlockhash: number[]
// }

// // struct2ts:go.sia.tech/siad/types.SiafundOutput
// export interface SiafundOutput {
//   value: Currency
//   unlockhash: number[]
//   claimstart: Currency
// }

// // struct2ts:go.sia.tech/siad/types.CoveredFields
// export interface CoveredFields {
//   wholetransaction: boolean
//   siacoininputs: number[] | null
//   siacoinoutputs: number[] | null
//   filecontracts: number[] | null
//   filecontractrevisions: number[] | null
//   storageproofs: number[] | null
//   siafundinputs: number[] | null
//   siafundoutputs: number[] | null
//   minerfees: number[] | null
//   arbitrarydata: number[] | null
//   transactionsignatures: number[] | null
// }

// // struct2ts:go.sia.tech/siad/types.TransactionSignature
// export interface TransactionSignature {
//   parentid: number[]
//   publickeyindex: number
//   timelock: number
//   coveredfields: CoveredFields
//   signature: number[] | null
// }

// // struct2ts:go.sia.tech/siad/types.Transaction
// export interface Transaction {
// 	siacoininputs: SiacoinInput[] | null;
// 	siacoinoutputs: SiacoinOutput[] | null;
// 	filecontracts: FileContract[] | null;
// 	filecontractrevisions: FileContractRevision[] | null;
// 	storageproofs: StorageProof[] | null;
// 	siafundinputs: SiafundInput[] | null;
// 	siafundoutputs: SiafundOutput[] | null;
// 	minerfees: Currency[] | null;
// 	arbitrarydata: []uint8[] | null;
// 	transactionsignatures: TransactionSignature[] | null;
// }

// struct2ts:go.sia.tech/siad/modules.MaintenanceSpending
export interface MaintenanceSpending {
  accountbalancecost: Currency
  fundaccountcost: Currency
  updatepricetablecost: Currency
}

// struct2ts:go.sia.tech/siad/node/api.RenterContract
export interface RenterContract {
  downloadspending: Currency
  endheight: number
  fees: Currency
  fundaccountspending: Currency
  hostpublickey: SiaPublicKey
  hostversion: string
  id: number[]
  lasttransaction: Transaction
  maintenancespending: MaintenanceSpending
  netaddress: string
  renterfunds: Currency
  size: number
  startheight: number
  storagespending: Currency
  StorageSpending: Currency
  totalcost: Currency
  uploadspending: Currency
  goodforupload: boolean
  goodforrenew: boolean
  badcontract: boolean
}

// struct2ts:go.sia.tech/siad/modules.RecoverableContract
export interface RecoverableContract {
  filesize: number
  filemerkleroot: number[]
  windowstart: number
  windowend: number
  payout: Currency
  validproofoutputs: SiacoinOutput[] | null
  missedproofoutputs: SiacoinOutput[] | null
  unlockhash: number[]
  revisionnumber: number
  id: number[]
  hostpublickey: SiaPublicKey
  inputparentid: number[]
  startheight: number
  txnfee: Currency
}

// struct2ts:go.sia.tech/siad/node/api.RenterContracts
export interface RenterContracts {
  contracts: RenterContract[] | null
  inactivecontracts: RenterContract[] | null
  activecontracts: RenterContract[] | null
  passivecontracts: RenterContract[] | null
  refreshedcontracts: RenterContract[] | null
  disabledcontracts: RenterContract[] | null
  expiredcontracts: RenterContract[] | null
  expiredrefreshedcontracts: RenterContract[] | null
  recoverablecontracts: RecoverableContract[] | null
}

// struct2ts:go.sia.tech/siad/modules.Allowance
export interface Allowance {
  funds: Currency
  hosts: number
  period: number
  renewwindow: number
  expectedstorage: number
  expectedupload: number
  expecteddownload: number
  expectedredundancy: number
  maxperiodchurn: number
  maxrpcprice: Currency
  maxcontractprice: Currency
  maxdownloadbandwidthprice: Currency
  maxsectoraccessprice: Currency
  maxstorageprice: Currency
  maxuploadbandwidthprice: Currency
}

// struct2ts:go.sia.tech/siad/modules.UploadsStatus
export interface UploadsStatus {
  paused: boolean
  pauseendtime: Date
}

// struct2ts:go.sia.tech/siad/modules.RenterSettings
export interface RenterSettings {
  allowance: Allowance
  ipviolationcheck: boolean
  maxuploadspeed: number
  maxdownloadspeed: number
  uploadsstatus: UploadsStatus
}

// struct2ts:go.sia.tech/siad/modules.ContractorSpending
export interface ContractorSpending {
  contractfees: Currency
  downloadspending: Currency
  fundaccountspending: Currency
  maintenancespending: MaintenanceSpending
  storagespending: Currency
  totalallocated: Currency
  uploadspending: Currency
  unspent: Currency
  contractspending: Currency
  withheldfunds: Currency
  releaseblock: number
  previousspending: Currency
}

// struct2ts:go.sia.tech/siad/modules.MemoryManagerStatus
export interface MemoryManagerStatus {
  available: number
  base: number
  requested: number
  priorityavailable: number
  prioritybase: number
  priorityrequested: number
  priorityreserve: number
}

// struct2ts:go.sia.tech/siad/modules.MemoryStatus
export interface MemoryStatus {
  available: number
  base: number
  requested: number
  priorityavailable: number
  prioritybase: number
  priorityrequested: number
  priorityreserve: number
  registry: MemoryManagerStatus
  userupload: MemoryManagerStatus
  userdownload: MemoryManagerStatus
  system: MemoryManagerStatus
}

// struct2ts:go.sia.tech/siad/node/api.RenterGET
export interface RenterGET {
  settings: RenterSettings
  financialmetrics: ContractorSpending
  currentperiod: number
  nextperiod: number
  memorystatus: MemoryStatus
}

// struct2ts:go.sia.tech/siad/node/api.RenterRecoveryStatusGET
export interface RenterRecoveryStatusGET {
  scaninprogress: boolean
  scannedheight: number
}

// struct2ts:go.sia.tech/siad/node/api.SiaConstants
export interface SiaConstants {
  blockfrequency: number
  blocksizelimit: number
  extremefuturethreshold: number
  futurethreshold: number
  genesistimestamp: number
  maturitydelay: number
  mediantimestampwindow: number
  siafundcount: Currency
  siafundportion: Rat | null
  targetwindow: number
  initialcoinbase: number
  minimumcoinbase: number
  roottarget: number[]
  rootdepth: number[]
  defaultallowance: Allowance
  maxadjustmentup: Rat | null
  maxadjustmentdown: Rat | null
  maxtargetadjustmentup: Rat | null
  maxtargetadjustmentdown: Rat | null
  siacoinprecision: Currency
}

// struct2ts:go.sia.tech/siad/modules.SiaPath
export interface SiaPath {
  path: string
}

// struct2ts:go.sia.tech/siad/modules.FileInfo
export interface FileInfo {
  accesstime: Date
  available: boolean
  changetime: Date
  ciphertype: string
  createtime: Date
  expiration: number
  filesize: number
  health: number
  localpath: string
  maxhealth: number
  maxhealthpercent: number
  modtime: Date
  mode: number
  numstuckchunks: number
  ondisk: boolean
  recoverable: boolean
  redundancy: number
  renewing: boolean
  repairbytes: number
  skylinks: string[] | null
  siapath: SiaPath
  stuck: boolean
  stuckbytes: number
  stuckhealth: number
  uid: number
  uploadedbytes: number
  uploadprogress: number
}

// struct2ts:go.sia.tech/siad/node/api.RenterFiles
export interface RenterFiles {
  files: FileInfo[] | null
}

// struct2ts:go.sia.tech/siad/node/api.RenterFile
export interface RenterFile {
  file: FileInfo
}

// struct2ts:go.sia.tech/siad/modules.DirectoryInfo
export interface DirectoryInfo {
  aggregatehealth: number
  aggregatelasthealthchecktime: Date
  aggregatemaxhealth: number
  aggregatemaxhealthpercentage: number
  aggregateminredundancy: number
  aggregatemostrecentmodtime: Date
  aggregatenumfiles: number
  aggregatenumstuckchunks: number
  aggregatenumsubdirs: number
  aggregaterepairsize: number
  aggregatesize: number
  aggregatestuckhealth: number
  aggregatestucksize: number
  health: number
  lasthealthchecktime: Date
  maxhealthpercentage: number
  maxhealth: number
  minredundancy: number
  mode: number
  mostrecentmodtime: Date
  numfiles: number
  numstuckchunks: number
  numsubdirs: number
  repairsize: number
  siapath: SiaPath
  size: number
  stuckhealth: number
  stucksize: number
  uid: number
}

// struct2ts:go.sia.tech/siad/node/api.RenterDirectory
export interface RenterDirectory {
  directories: DirectoryInfo[] | null
  files: FileInfo[] | null
}

// exports
export { ParseDate, ParseNumber, FromArray, ToObject }
