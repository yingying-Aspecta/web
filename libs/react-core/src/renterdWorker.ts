import { debounce } from 'lodash'
import { AutopilotHost } from './renterdAutopilot'
import { HookArgsCallback } from './request'
import { Host, HostSettings } from './siaTypes'
import { useGetDownloadFunc } from './useGetDownload'
import { usePostFunc } from './usePost'
import { usePutFunc } from './usePut'
import { delay } from './utils'

export function useObjectDownloadFunc(
  args?: HookArgsCallback<{ key: string }, void, Blob>
) {
  return useGetDownloadFunc({ ...args, route: '/worker/objects/:key' })
}

export function useObjectUpload(
  args?: HookArgsCallback<{ key: string }, File, void>
) {
  return usePutFunc(
    {
      ...args,
      config: {
        ...args?.config,
        axios: {
          ...args?.config?.axios,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      },
      route: '/worker/objects/:key',
    },
    (mutate) => {
      mutate((key) => key.startsWith('/bus/objects'))
    }
  )
}

type RhpScanRequest = {
  hostKey: string
  hostIP: string
  timeout: number
}

type RhpScanResponse = {
  ping: string
  scanError?: string
  settings?: HostSettings
}

const debouncedListRevalidate = debounce((func: () => void) => func(), 5_000)

export function useRhpScan(
  args?: HookArgsCallback<void, RhpScanRequest, RhpScanResponse>
) {
  return usePostFunc(
    { ...args, route: '/worker/rhp/scan' },
    async (mutate, { payload: { hostKey } }, response) => {
      // Fetching immediately after the response returns stale data so
      // we optimistically update without triggering revalidation,
      // and then revalidate after a 5s delay. The list revalidation
      // is debounced so if the user rescans multiple hosts in quick
      // succession the list is optimistically updated n times followed
      // by a single network revalidate.
      mutate<AutopilotHost[]>(
        (key) => key.startsWith('/autopilot/hosts'),
        (data) =>
          data?.map((aph) => {
            if (aph.host.public_key === hostKey) {
              return {
                ...aph,
                host: {
                  ...aph.host,
                  interactions: {
                    ...aph.host.interactions,
                    LastScan: new Date().toISOString(),
                  },
                  settings: response.data.settings,
                },
              }
            }
            return aph
          }),
        false
      )
      mutate<Host[]>(
        (key) => key.startsWith('/bus/search/hosts'),
        (data) =>
          data?.map((host) => {
            if (host.public_key === hostKey) {
              return {
                ...host,
                interactions: {
                  ...host.interactions,
                  LastScan: new Date().toISOString(),
                },
                settings: response.data.settings,
              }
            }
            return host
          }),
        false
      )
      debouncedListRevalidate(() => {
        mutate(
          (key) =>
            key.startsWith('/autopilot/hosts') ||
            key.startsWith('/bus/search/hosts'),
          (d) => d,
          true
        )
      })
    }
  )
}
