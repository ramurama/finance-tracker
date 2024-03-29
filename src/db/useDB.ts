import { useContext } from 'react'

import { DBConnectionContext } from './DBConnectionContext'

export const useDB = () => useContext(DBConnectionContext)
