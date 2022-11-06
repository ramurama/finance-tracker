import { FontAwesome } from '@expo/vector-icons'
import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Chip } from '../../../components/atoms/Chip'
import { i18n } from '../../../locales'
import { useTheme } from '../../../theme'

export type BookItemProps = {
  title: string
  currency: string
  isDefault?: boolean
  onPress: () => void
}

export const BookItem: FC<BookItemProps> = ({ title, currency, isDefault, onPress }) => {
  const { colors } = useTheme()

  const Icon = () => (
    <View style={styles.iconView}>
      <FontAwesome name="book" color={colors.tabIconInactiveColor} size={40} />
    </View>
  )

  const Currency = () => (
    <View style={styles.currencyView}>
      <Text style={{ ...styles.currency, color: colors.text }}>{currency}</Text>
    </View>
  )

  const Content = () => (
    <View style={styles.contentView}>
      <View style={styles.titleView}>
        <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>
        <View style={styles.chipContainer}>
          {isDefault && <Chip text={i18n.t('common.default')} />}
        </View>
      </View>
      <Currency />
    </View>
  )

  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.container }}>
      <Icon />
      <Content />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gray',
    padding: 10,
    flexDirection: 'row',
    height: 80,
  },
  iconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    flex: 4,
    flexDirection: 'row',
  },
  titleView: {
    flex: 4,
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  currencyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  currency: {
    fontSize: 14,
    fontWeight: '400',
  },
  chipContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})
