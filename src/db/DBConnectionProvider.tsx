import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { DataSource } from 'typeorm'

import { DBConnectionContext, DBConnectionContextData } from './DBConnectionContext'
import { getDataSource, initDatabase } from './dbManager'
import { BookService, CategoryService, TransactionService } from './services'

export const DBConnectionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataSource, setDataSource] = useState<DataSource | null>(null)

  const connect = useCallback(async () => {
    try {
      await initDatabase()

      const appDataSource = getDataSource()

      if (appDataSource) {
        setDataSource(appDataSource)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (!dataSource) {
      connect()
    }
  }, [connect, dataSource])

  if (!dataSource) {
    // TODO: show loader here
    return <></>
  }

  // add all the db services here
  const services: DBConnectionContextData = {
    bookService: new BookService(dataSource),
    categoryService: new CategoryService(dataSource),
    transactionService: new TransactionService(dataSource),
  }

  return <DBConnectionContext.Provider value={services}>{children}</DBConnectionContext.Provider>
}
