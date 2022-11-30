import { DataSource } from 'typeorm'

import { config } from '../config'
import { entities } from './entities'

//  TODO: create db name unique to the user
const DB_NAME = 'finance-tracker-database.db'

let dataSource: DataSource | null

export async function initDatabase() {
  if (dataSource?.isInitialized) {
    await dataSource.destroy()
  }

  dataSource = new DataSource({
    database: DB_NAME,
    type: 'expo',
    driver: require('expo-sqlite'),
    // !! synchronize should not be used in production
    // dropSchema: config.dbSynchronize,
    synchronize: config.dbSynchronize,
    entities,
  })

  await dataSource.initialize()
}

export async function destroyConnection() {
  if (dataSource?.isInitialized) {
    await dataSource?.destroy()

    return dataSource?.isInitialized
  }

  return null
}

export function getDataSource() {
  if (dataSource?.isInitialized) {
    return dataSource
  }

  return null
}
