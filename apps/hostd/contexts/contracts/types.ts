import {
  FileContractID,
  Hash256,
  Signature,
  UnlockConditions,
  SiacoinOutput,
} from '@siafoundation/react-core'
import {
  ContractFilterSortField,
  ContractStatus,
} from '@siafoundation/react-hostd'
import BigNumber from 'bignumber.js'

export type ContractData = {
  id: string
  revision: {
    parentID: FileContractID
    unlockConditions: UnlockConditions
    filesize: BigNumber
    fileMerkleRoot: Hash256
    windowStart: number
    windowEnd: number
    payout: BigNumber
    validProofOutputs: SiacoinOutput[]
    missedProofOutputs: SiacoinOutput[]
    unlockHash: Hash256
    revisionNumber: number
  }
  usage: {
    total: BigNumber
    accountFunding: BigNumber
    egress: BigNumber
    ingress: BigNumber
    riskedCollateral: BigNumber
    rpc: BigNumber
    storage: BigNumber
  }

  hostSignature: Signature
  renterSignature: Signature

  status: ContractStatus
  lockedCollateral: BigNumber
  negotiationHeight: number
  formationConfirmed: boolean
  revisionConfirmed: boolean
  payoutHeight: number
  contractHeightStart: number
  contractHeightEnd: number
  resolutionHeight: number
  renewedTo: FileContractID
  renewedFrom: FileContractID
  isRenewedTo: boolean
  isRenewedFrom: boolean
}

export type TableColumnId =
  | 'actions'
  | 'contractId'
  | 'status'
  | 'usageTotal'
  | 'usageAccountFunding'
  | 'usageEgress'
  | 'usageIngress'
  | 'usageRiskedCollateral'
  | 'usageRpc'
  | 'usageStorage'
  | 'lockedCollateral'
  | 'timeline'
  | 'negotiationHeight'
  | 'formationConfirmed'
  | 'revisionConfirmed'
  | 'resolutionConfirmed'
  | 'renewedTo'
  | 'renewedFrom'

export const columnsDefaultVisible: TableColumnId[] = [
  'contractId',
  'status',
  'usageTotal',
  'lockedCollateral',
  'timeline',
  'negotiationHeight',
  'formationConfirmed',
  'revisionConfirmed',
  'resolutionConfirmed',
  'renewedTo',
  'renewedFrom',
]

export type SortField = ContractFilterSortField | 'timeline'

export const sortOptions: {
  id: SortField
  value: ContractFilterSortField
  label: string
  category: string
}[] = [
  {
    id: 'status',
    value: 'status',
    label: 'status',
    category: 'general',
  },
  {
    id: 'timeline',
    value: 'negotiationHeight',
    label: 'timeline',
    category: 'time',
  },
  {
    id: 'negotiationHeight',
    value: 'negotiationHeight',
    label: 'negotiation height',
    category: 'time',
  },
  {
    id: 'expirationHeight',
    value: 'expirationHeight',
    label: 'expiration height',
    category: 'time',
  },
]

export const defaultSortField: SortField = 'timeline'
