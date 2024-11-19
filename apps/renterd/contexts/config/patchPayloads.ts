import {
  AutopilotConfig,
  SettingsGouging,
  SettingsPinned,
  SettingsUpload,
} from '@siafoundation/renterd-types'
import { isObject, isEqual, union, keys } from '@technically/lodash'
import { ResourcesRequiredLoaded } from './useResources'

/**
 * @param param0 An object containing the resources and payloads.
 * @returns An object with each patch payload or undefined if no changes.
 */
export function getPatchPayloads({
  resources,
  payloads,
}: {
  resources: ResourcesRequiredLoaded
  payloads: {
    autopilot?: AutopilotConfig
    gouging: SettingsGouging
    pinned: SettingsPinned
    upload: SettingsUpload
  }
}) {
  return {
    autopilot: getPatch(resources.autopilot.data, payloads.autopilot),
    gouging: getPatch(resources.gouging.data, payloads.gouging),
    pinned: getPatch(resources.pinned.data, payloads.pinned),
    upload: getPatch(resources.upload.data, payloads.upload),
  }
}

/**
 * @param existing The existing object.
 * @param updated The updated object.
 * @returns A partial object of T with the differences between existing and updated.
 */
function getPatch<T>(existing: T, updated: T): DeepPartial<T> | undefined {
  if (isEqual(existing, updated)) {
    return undefined
  }

  if (!isObject(existing) || !isObject(updated)) {
    return updated as DeepPartial<T>
  }

  const keysList = union(keys(existing), keys(updated)) as Array<keyof T>

  const result = {} as DeepPartial<T>
  let isChanged = false

  keysList.forEach((key) => {
    const origValue = existing[key]
    const stagedValue = updated[key]

    const valueChange = getPatch(origValue, stagedValue)

    if (valueChange !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi, @typescript-eslint/no-explicit-any
      ;(result as any)[key] = valueChange
      isChanged = true
    }
  })

  return isChanged ? result : undefined
}

type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T
