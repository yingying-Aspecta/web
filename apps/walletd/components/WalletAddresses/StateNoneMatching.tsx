import { Filter32, Text } from '@siafoundation/design-system'

export function StateNoneMatching() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <Filter32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        No addresses matching filters.
      </Text>
    </div>
  )
}
