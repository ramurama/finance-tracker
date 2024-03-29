import { MetaData } from './MetaData'

export interface Book extends MetaData {
  id: number
  name: string
  emoji: string
  currencyCode: string
  currencySymbol: string
  isDefault: boolean
}
