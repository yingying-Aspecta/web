import { useCallback } from 'react'
import { WalletSendSiacoinDialog } from '@siafoundation/design-system'
import {
  useTxPoolBroadcast,
  useWalletBalance,
  useWalletDiscard,
  useWalletFund,
  useWalletSign,
} from '@siafoundation/react-renterd'
import { useDialog } from '../contexts/dialog'
import BigNumber from 'bignumber.js'

export function RenterdSendSiacoinDialog() {
  const { dialog, openDialog, closeDialog } = useDialog()
  const balance = useWalletBalance()

  const fund = useWalletFund()
  const sign = useWalletSign()
  const broadcast = useTxPoolBroadcast()
  const discard = useWalletDiscard()
  const send = useCallback(
    async ({ sc, address }: { sc: BigNumber; address: string }) => {
      const fundResponse = await fund.post({
        payload: {
          amount: sc.toString(),
          transaction: {
            siacoinOutputs: [
              {
                address: address,
                value: sc.toString(),
              },
            ],
          },
        },
      })
      if (fundResponse.error) {
        return {
          error: fundResponse.error,
        }
      }
      const signResponse = await sign.post({
        payload: {
          transaction: fundResponse.data.transaction,
          toSign: fundResponse.data.toSign,
          coveredFields: {
            WholeTransaction: true,
          },
        },
      })
      if (signResponse.error) {
        discard.post({
          payload: fundResponse.data.transaction,
        })
        return {
          error: signResponse.error,
        }
      }
      const broadcastResponse = await broadcast.post({
        payload: [signResponse.data],
      })
      if (broadcastResponse.error) {
        discard.post({
          payload: signResponse.data,
        })
        return {
          error: broadcastResponse.error,
        }
      }
      return {
        // Need transaction ID, but its not part of transaction object
        // transactionId: signResponse.data.??,
      }
    },
    [fund, sign, broadcast, discard]
  )

  return (
    <WalletSendSiacoinDialog
      balance={balance.data ? new BigNumber(balance.data) : undefined}
      send={send}
      open={dialog === 'sendSiacoin'}
      onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
    />
  )
}
