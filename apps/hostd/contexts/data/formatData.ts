import { ChartPoint } from '@siafoundation/design-system'
import { groupBy, omit } from 'lodash'
import { getDaysInMs } from '@siafoundation/design-system'
import { format, startOfMonth, startOfWeek } from 'date-fns'
import { futureSpan } from '.'

type AggregationMode = 'total' | 'average'

type TimeRange = {
  start: number
  end: number
}

export function formatData(
  data: ChartPoint[],
  timeRange: TimeRange,
  mode: AggregationMode
) {
  const { start, end } = timeRange
  const keys = Object.keys(omit(data[0], 'timestamp'))

  // prep
  data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

  // aggregate
  const { normalize } = getTimeRangeRollup(timeRange)
  const grouped = groupBy(data, (point) => {
    const normalizedTimestamp = normalize(point.timestamp)
    return normalizedTimestamp
  })
  const aggregated = Object.entries(grouped).reduce(
    (acc, [timestamp, group]) => {
      const aggregatedPoint: ChartPoint = {
        timestamp: Number(timestamp),
      }
      keys.forEach((key) => {
        for (let i = 0; i < group.length; i++) {
          const val = aggregatedPoint[key] || 0
          aggregatedPoint[key] = val + (group[i][key] || 0)
        }
      })
      if (mode === 'average') {
        keys.forEach((key) => {
          const val = aggregatedPoint[key]
          aggregatedPoint[key] = val / group.length
        })
      }
      return acc.concat(aggregatedPoint)
    },
    [] as ChartPoint[]
  )

  // filter
  return aggregated.filter(
    (point) => point.timestamp >= start && point.timestamp < end
  )
}

export function getTimeRangeRollup(timeRange: TimeRange) {
  const { start, end } = timeRange
  const range = end - start

  return range > getDaysInMs(90 + futureSpan)
    ? {
        normalize: (timestamp: number) => startOfMonth(timestamp).getTime(),
        label: (timestamp: number) => {
          const ts = startOfMonth(timestamp).getTime()
          return `Month starting ${format(ts, 'PP')}`
        },
      }
    : range > getDaysInMs(30 + futureSpan)
    ? {
        normalize: (timestamp: number) => startOfWeek(timestamp).getTime(),
        label: (timestamp: number) => {
          const ts = startOfWeek(timestamp).getTime()
          return `Week starting ${format(ts, 'PP')}`
        },
      }
    : {
        normalize: (timestamp: number) => timestamp,
        label: (timestamp: number) => {
          return `Day of ${format(timestamp, 'PP')}`
        },
      }
}
