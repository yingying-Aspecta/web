import { Transaction } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type EntityType = 'transaction' | 'block' | 'output' | 'address' | 'ip'

export type TxType =
  | 'siacoin'
  | 'siafund'
  | 'contract'
  | 'proof'
  | 'revision'
  | 'block'
  | 'defrag'
  | 'setup'

export function getTransactionTotals(txn: Transaction) {
  const sc = (txn.siacoinoutputs || []).reduce(
    (acc, i) => acc.plus(String(i.value)),
    new BigNumber(0)
  )
  const sf = (txn.siafundoutputs || []).reduce(
    (acc, i) => acc.plus(String(i.value)),
    new BigNumber(0)
  )

  return {
    sc,
    sf: sf.toNumber(),
  }
}

export function getTransactionTypes(txn: Transaction): TxType | undefined {
  const { sc: totalSiacoin, sf: totalSiafund } = getTransactionTotals(txn)

  if (txn.filecontracts && txn.filecontracts.length > 0) {
    return 'contract'
  }
  if (txn.filecontractrevisions && txn.filecontractrevisions.length > 0) {
    return 'revision'
  }
  if (txn.storageproofs && txn.storageproofs.length > 0) {
    return 'proof'
  }

  if (totalSiafund !== 0) {
    return 'siafund'
  }
  if (!totalSiacoin.isZero()) {
    return 'siacoin'
  }

  // https://gitlab.com/NebulousLabs/Sia-UI/-/blob/master/app/utils/index.ts
  // if (isSetupTransaction(txn)) {
  //   txTypes.push(TransactionTypes.setup)
  // }

  if (
    txn.siacoinoutputs &&
    txn.siacoininputs?.length === 0 &&
    txn.siafundinputs?.length === 0
  ) {
    return 'block'
  }
  if (
    (txn.siacoininputs?.length || 0) >= 20 &&
    txn.siacoinoutputs?.length === 1
  ) {
    return 'defrag'
  }

  return undefined
}

const entityTypeMap: Record<EntityType, string> = {
  transaction: 'transaction',
  block: 'block',
  output: 'output',
  address: 'address',
  ip: 'IP',
}

const txTypeMap: Record<TxType, string> = {
  siacoin: 'siacoin transfer',
  siafund: 'siafund transfer',
  contract: 'contract formation',
  proof: 'storage proof',
  revision: 'contract revision',
  block: 'block',
  defrag: 'defrag',
  setup: 'setup',
}

const entityTypeInitialsMap: Record<EntityType, string> = {
  block: 'Bk',
  transaction: 'Tx',
  output: 'O',
  address: 'A',
  ip: 'I',
}

export function getEntityTypeLabel(type?: EntityType): string | undefined {
  return type ? entityTypeMap[type] : undefined
}

export function getTxTypeLabel(type?: TxType): string | undefined {
  return type ? txTypeMap[type] : undefined
}

export function getEntityTypeInitials(type?: EntityType): string | undefined {
  return type ? entityTypeInitialsMap[type] : undefined
}
