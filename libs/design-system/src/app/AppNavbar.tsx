import { Text } from '../core/Text'

type Props = {
  title?: string
  nav?: React.ReactNode
  actions?: React.ReactNode
}

export const navbarAppHeight = 60

export function AppNavbar({ title, nav, actions }: Props) {
  return (
    <div className="flex items-center gap-2 px-6 h-14 z-10 bg-white dark:bg-graydark-50 border-b border-gray-500 dark:border-graydark-500 overflow-hidden">
      {title && (
        <Text
          font="mono"
          size="18"
          weight="bold"
          className="hidden lg:block relative -top-px"
        >
          {title}
        </Text>
      )}
      <div className="flex-1 flex gap-4 items-center justify-between h-full overflow-hidden">
        <div className="flex gap-2 items-center h-full overflow-hidden">
          {nav}
        </div>
        <div className="flex gap-2 items-center h-full">{actions}</div>
      </div>
    </div>
  )
}
