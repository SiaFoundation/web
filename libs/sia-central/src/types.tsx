export const api = 'https://api.siacentral.com/v2'

export type SiaCentralNetworkStats = {
  settings: {
    max_download_batch_size: number
    max_duration: number
    max_revise_batch_size: number
    remaining_storage: number
    sector_size: number
    total_storage: number
    window_size: number
    revision_number: number
    base_rpc_price: string
    collateral: string
    max_collateral: string
    contract_price: string
    download_price: string
    sector_access_price: string
    storage_price: string
    upload_price: string
  }
  price_table: {
    uid: string
    validity: number
    hostblockheight: number
    updatepricetablecost: string
    accountbalancecost: string
    fundaccountcost: string
    latestrevisioncost: string
    subscriptionmemorycost: string
    subscriptionnotificationcost: string
    initbasecost: string
    memorytimecost: string
    downloadbandwidthcost: string
    uploadbandwidthcost: string
    dropsectorsbasecost: string
    dropsectorsunitcost: string
    hassectorbasecost: string
    readbasecost: string
    readlengthcost: string
    renewcontractcost: string
    revisionbasecost: string
    swapsectorcost: string
    writebasecost: string
    writelengthcost: string
    writestorecost: string
    txnfeeminrecommended: string
    txnfeemaxrecommended: string
    contractprice: string
    collateralcost: string
    maxcollateral: string
    maxduration: number
    windowsize: number
    registryentriesleft: number
    registryentriestotal: number
  }
  benchmarks: {
    contract_time: number
    upload_time: number
    download_time: number
    data_size: number
  }
  benchmarks_rhp2?: {
    contract_time: number
    upload_time: number
    download_time: number
    data_size: number
  }
}

export type SiaCentralHost = {
  net_address: string
  public_key: string
  version: string
  estimated_uptime: number
  online: boolean
  first_seen_height: number
  first_seen_timestamp: string
  last_scan: string
  last_success_scan: string
  country_code: string
  location: [number, number]
  settings: {
    netaddress: string
    version: string
    accepting_contracts: boolean
    max_download_batch_size: number
    max_duration: number
    max_revise_batch_size: number
    remaining_storage: number
    sector_size: number
    total_storage: number
    window_size: number
    revision_number: number
    base_rpc_price: string
    collateral: string
    max_collateral: string
    contract_price: string
    download_price: string
    sector_access_price: string
    storage_price: string
    upload_price: string
    ephemeral_account_expiry: number
    max_ephemeral_account_balance: string
    sia_mux_port: string
  }
  price_table: {
    uid: string
    validity: number
    hostblockheight: number
    updatepricetablecost: string
    accountbalancecost: string
    fundaccountcost: string
    latestrevisioncost: string
    subscriptionmemorycost: string
    subscriptionnotificationcost: string
    initbasecost: string
    memorytimecost: string
    downloadbandwidthcost: string
    uploadbandwidthcost: string
    dropsectorsbasecost: string
    dropsectorsunitcost: string
    hassectorbasecost: string
    readbasecost: string
    readlengthcost: string
    renewcontractcost: string
    revisionbasecost: string
    swapsectorcost: string
    writebasecost: string
    writelengthcost: string
    writestorecost: string
    txnfeeminrecommended: string
    txnfeemaxrecommended: string
    contractprice: string
    collateralcost: string
    maxcollateral: string
    maxduration: number
    windowsize: number
    registryentriesleft: number
    registryentriestotal: number
  }
  benchmark: {
    contract_time: number
    upload_time: number
    download_time: number
    data_size: number
    last_attempt: string
    last_successful: string
    error?: string
  }
}

export type SiaCentralContract = {
  id: string
  transaction_id: string
  merkle_root: string
  unlock_hash: string
  status: string
  revision_number: number
  negotiation_height: number
  expiration_height: number
  proof_deadline: number
  proof_height: number
  expiration_exchange_rate: {
    currency: string
    rate: string
  }
  payout: string
  file_size: string
  valid_proof_outputs: SiaCentralPartialSiacoinOutput[]
  missed_proof_outputs: SiaCentralPartialSiacoinOutput[]
  negotiation_timestamp: string
  expiration_timestamp: string
  proof_deadline_timestamp: string
  proof_timestamp: string
  proof_confirmed: boolean
  payout_height: number
  payout_timestamp: string
  unused: boolean
  previous_revisions: SiaCentralContract[]
}

export type SiaCentralSiacoinInput = {
  output_id: string
  transaction_id: string
  block_id: string
  unlock_hash: string
  block_height: number
  source: string
  value: string
  unlock_conditions: {
    timelock: number
    required_signatures: number
    public_keys: string[]
  }
}

export type SiaCentralPartialSiacoinOutput = {
  output_id: string
  source: string
  unlock_hash: string
  value: string
}

export type SiaCentralSiacoinOutput = {
  output_id: string
  transaction_id: string
  block_id: string
  spent_transaction_id: string
  unlock_hash: string
  maturity_height: number
  block_height: number
  source: string
  value: string
}

export type SiaCentralSiafundInput = {
  output_id: string
  transaction_id: string
  unlock_hash: string
  block_height: number
  value: string
  claim_unlock_hash: string
  claim_output_id: string
  claim_value: string
  unlock_conditions: {
    timelock: number
    required_signatures: number
    public_keys: string[]
  }
}

export type SiaCentralSiafundOutput = {
  output_id: string
  transaction_id: string
  block_id: string
  spent_transaction_id?: string
  unlock_hash: string
  block_height: number
  value: string
  claim_start: string
  claim_value: string
}

export type SiaCentralTransactionSignature = {
  parent_id: string
  transaction_id: string
  block_id: string
  signature: string
  public_key_index: 0
  covered_fields: {
    whole_transaction: false
    siacoin_inputs: number[]
    siacoin_outputs: number[]
    storage_contracts: number[]
    storage_contract_revisions: number[]
    storage_proofs: number[]
    miner_fees: number[]
    arbitrary_data: number[]
    transaction_signatures: number[]
  }
}

export type SiaCentralStorageProof = {
  contract_id: string
  transaction_id: string
  block_id: string
  block_height: number
  segment: number[]
  hashset: string[]
  timestamp: string
}

export type SiaCentralHostAnnouncement = {
  transaction_id: string
  block_id: string
  public_key: string
  net_address: string
  block_height: number
  timestamp: string
}

export type SiaCentralTransaction = {
  id: string
  block_id: string
  block_height: number
  confirmations: number
  block_index: number
  timestamp: string
  size: string
  fees: string
  siacoin_inputs?: SiaCentralSiacoinInput[]
  siacoin_outputs?: SiaCentralSiacoinOutput[]
  siafund_inputs?: SiaCentralSiafundInput[]
  siafund_outputs?: SiaCentralSiafundOutput[]
  storage_contracts?: SiaCentralContract[]
  contract_revisions?: SiaCentralContract[]
  storage_proofs?: SiaCentralStorageProof[]
  miner_fees: string[]
  host_announcements?: SiaCentralHostAnnouncement[]
  arbitrary_data: string[]
  transaction_signatures: SiaCentralTransactionSignature[]
  exchange_rate: {
    currency: string
    rate: string
  }
}

export type SiaCentralBlock = {
  id: string
  parent_id: string
  height: number
  nonce: number[]
  size: string
  transactions: SiaCentralTransaction[]
  siacoin_outputs: SiaCentralSiacoinOutput[]
  siafund_pool: string
  timestamp: string
}

export type SiaCentralUnlockHash = {
  address: string
  usage_type: string
}
