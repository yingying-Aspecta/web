import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { humanSiacoin } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { Warning16 } from '@carbon/icons-react'
import { Tooltip } from '../core/Tooltip'

export function WalletBalance({
  sc,
  isSynced,
}: {
  sc?: BigNumber
  isSynced: boolean
}) {
  if (!sc) {
    return null
  }

  if (!isSynced) {
    return (
      <Tooltip content="Blockchain is syncing, balance may be incorrect.">
        <Panel className="hidden sm:flex h-7 pl-2 pr-3 gap-1.5 items-center">
          <Text color="amber">
            <Warning16 className="" />
          </Text>
          <Text size="12" weight="semibold">
            {humanSiacoin(sc)}
          </Text>
        </Panel>
      </Tooltip>
    )
  }

  return (
    <Panel className="hidden sm:flex h-7 px-3 items-center">
      <Text size="12" weight="semibold">
        {humanSiacoin(sc)}
      </Text>
    </Panel>
  )
}
