import { FontAwesome } from '@expo/vector-icons'
import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Chip } from '../../../components/atoms'
import { i18n } from '../../../locales'
import { useTheme } from '../../../theme'

export type BookItemProps = {
  title: string
  currency: string
  isDefault?: boolean
  onPress: () => void
  onLongPress: () => void
}

export const BookItem: FC<BookItemProps> = ({
  title,
  currency,
  isDefault,
  onPress,
  onLongPress,
}) => {
  const { colors } = useTheme()

  const Icon = () => (
    <View style={styles.iconView}>
      <FontAwesome name="book" color={colors.tabIconInactiveColor} size={40} />
    </View>
  )

  const Currency = () => (
    <View style={styles.currencyView}>
      <Text style={{ ...styles.currency, color: colors.greyText }}>{currency}</Text>
    </View>
  )

  const Content = () => (
    <View style={styles.contentView}>
      <View style={styles.titleView}>
        <View style={styles.titleContainer}>
          <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>
        </View>
        {isDefault && (
          <View style={styles.chipContainer}>
            <Chip text={i18n.t('common.default')} />
          </View>
        )}
      </View>
      <Currency />
    </View>
  )

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        ...styles.container,
        backgroundColor: colors.background,
        borderBottomColor: colors.borderColor,
      }}>
      <Icon />
      <Content />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    padding: 10,
    // borderRadius: 15,
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // margin: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
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
    fontSize: 50,
    fontWeight: '400',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})
