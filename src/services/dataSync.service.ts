import {
  BackgroundFetchResult,
  BackgroundFetchStatus,
  getStatusAsync,
  registerTaskAsync,
  unregisterTaskAsync,
} from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'

import { config } from '../config'

// !! never change the task name for lifetime, done for life :D
export const BACKGROUND_SYNC_TASK = 'background-data-sync'

export type DataSyncStatus = string | null | undefined

// task definition
// !! This needs to be called in the global scope (e.g outside of React components)
export function defineBackgroundSyncTask() {
  TaskManager.defineTask(BACKGROUND_SYNC_TASK, () => {
    try {
      console.log(`Got background fetch call at date: ${new Date(Date.now()).toISOString()}`)

      // TODO: upload data to backend here
      // TODO: check net info here - sync data only if connected to 3G or above
      // !! The server should accept the data only if the secret key matches

      return BackgroundFetchResult.NewData
    } catch (error) {
      console.error(error)

      return BackgroundFetchResult.Failed
    }
  })
}

// Register the task
// this can be called in the React components
export function registerBackgroundSync() {
  return registerTaskAsync(BACKGROUND_SYNC_TASK, {
    minimumInterval: config.dataSyncInterval,
    startOnBoot: true, // android only
  })
}

// TODO: unregister on logout
// TODO: unregister on demand using toggle
// unregister the task when data sync is turned off
// this can be called in the React components
export function unRegisterBackgroundSync() {
  return unregisterTaskAsync(BACKGROUND_SYNC_TASK)
}

export async function getSyncStatus() {
  const status = await getStatusAsync()

  if (!status) {
    return null
  }

  return BackgroundFetchStatus[status]
}

export function isBackgroundSyncRegistered() {
  return TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK)
}
