/* eslint-disable react/no-unescaped-entities */
import {
  ConfigFields,
  Dialog,
  FieldNumber,
  FieldText,
  FormSubmitButton,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useWalletAddressAdd } from '@siafoundation/react-walletd'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddresses } from '../contexts/addresses'
import { useDialogFormHelpers } from '../hooks/useDialogFormHelpers'
import { getWalletWasm } from '../lib/wasm'
import { SeedLayout } from './SeedLayout'
import { useWallets } from '../contexts/wallets'
import BigNumber from 'bignumber.js'
import { VerifyIcon } from './VerifyIcon'
import { getFieldMnemonic, MnemonicFieldType } from '../lib/fieldMnemonic'

export type WalletAddressesGenerateDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletAddressesGenerateDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues(lastIndex: number) {
  return {
    mnemonic: '',
    index: new BigNumber(lastIndex),
    count: new BigNumber(1),
  }
}

function getFields({
  seedHash,
  mnemonicFieldType,
  setMnemonicFieldType,
}: {
  seedHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
}): ConfigFields<ReturnType<typeof getDefaultValues>, never> {
  return {
    mnemonic: getFieldMnemonic({
      seedHash,
      setMnemonicFieldType,
      mnemonicFieldType,
    }),
    index: {
      type: 'number',
      title: 'Start index',
      decimalsLimit: 0,
      placeholder: '0',
      validation: {
        required: 'required',
      },
    },
    count: {
      type: 'number',
      title: 'Number of addresses',
      decimalsLimit: 0,
      placeholder: '10',
      validation: {
        required: 'required',
        max: 1000,
      },
    },
  }
}

export function WalletAddressesGenerateDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = params || {}
  const { lastIndex } = useAddresses()
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const nextIndex = lastIndex + 1
  const defaultValues = getDefaultValues(nextIndex)
  const [mnemonicFieldType, setMnemonicFieldType] =
    useState<MnemonicFieldType>('password')
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  useEffect(() => {
    if (form.formState.isSubmitting) {
      return
    }
    form.setValue('index', new BigNumber(nextIndex))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextIndex])

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const mnemonic = form.watch('mnemonic')
  const index = form.watch('index')
  const count = form.watch('count')

  const fields = getFields({
    seedHash: wallet?.seedHash,
    mnemonicFieldType,
    setMnemonicFieldType,
  })

  const addressAdd = useWalletAddressAdd()
  const generateAddresses = useCallback(
    async (mnemonic: string, index: number, count: number) => {
      for (let i = index; i < index + count; i++) {
        const { seed } = getWalletWasm().seedFromPhrase(mnemonic)
        const addrRes = getWalletWasm().addressFromSeed(seed, i)
        if (addrRes.error) {
          triggerErrorToast('Error generating addresses.')
          return
        }
        const response = await addressAdd.put({
          params: {
            id: walletId,
            addr: addrRes.address,
          },
          payload: {
            index: i,
          },
        })
        if (response.error) {
          if (count === 1) {
            triggerErrorToast('Error saving address.')
          } else {
            triggerErrorToast(
              `Error saving addresses. ${
                i > 0 ? 'Not all addresses were saved.' : ''
              }`
            )
          }
          return
        }
      }
      if (count === 1) {
        triggerSuccessToast('Successfully generated 1 address.')
      } else {
        triggerSuccessToast(`Successfully generated ${count} addresses.`)
      }
      closeAndReset()
    },
    [walletId, addressAdd, closeAndReset]
  )

  const onSubmit = useCallback(() => {
    return generateAddresses(mnemonic, index.toNumber(), count.toNumber())
  }, [generateAddresses, mnemonic, index, count])

  return (
    <Dialog
      title={`Wallet ${wallet?.name}: generate addresses`}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[500px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex justify-end">
          <FormSubmitButton form={form} variant="accent" size="medium">
            Continue
          </FormSubmitButton>
        </div>
      }
    >
      <SeedLayout
        icon={<VerifyIcon />}
        description={<>Enter your seed mnemonic to generate addresses.</>}
      >
        <div className="flex flex-col gap-2 py-2">
          <FieldText form={form} field={fields.mnemonic} name="mnemonic" />
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <FieldNumber form={form} field={fields.index} name="index" />
            </div>
            <div className="flex-1">
              <FieldNumber form={form} field={fields.count} name="count" />
            </div>
          </div>
        </div>
      </SeedLayout>
    </Dialog>
  )
}
