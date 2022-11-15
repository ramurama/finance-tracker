import { useContext } from 'react'

import { DBConnectionContext } from './DBConnectionContext'

export const useDb = () => useContext(DBConnectionContext)
