import { View } from 'react-native'

import { i18n } from '../../../../locales'
import { TransactionType } from '../../../../types'
import { styles } from './styles'
import { TypeSelectorItem } from './TypeSelectorItem'

export type TypeSelectorProps = {
  value: number
  onChange: (value: TransactionType) => void
}

export const TypeSelector = (props: TypeSelectorProps) => {
  const { value, onChange } = props

  return (
    <View style={styles.selectorContainer}>
      <TypeSelectorItem
        name={i18n.t('common.expense')}
        selected={value === 1}
        onPress={() => {
          onChange(1)
        }}
      />
      <TypeSelectorItem
        name={i18n.t('common.income')}
        selected={value === 2}
        onPress={() => {
          onChange(2)
        }}
      />
    </View>
  )
}
