import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { Chip } from '../../../components/atoms'
import { i18n } from '../../../locales'
import { TransactionType } from '../../../types'

export type FiltersProps = {
  value: TransactionType
  onChange: (selected: TransactionType) => void
}

export const Filters: FC<FiltersProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Chip
        text={i18n.t('common.expense')}
        isActive={value === 1}
        onPress={() => {
          onChange(1)
        }}
        touchable
        touchDisabled={value === 1}
      />
      <Chip
        text={i18n.t('common.income')}
        isActive={value === 2}
        onPress={() => {
          onChange(2)
        }}
        touchable
        touchDisabled={value === 2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
