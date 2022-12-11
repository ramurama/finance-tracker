import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Chip } from '../../../../components/atoms'
import { i18n } from '../../../../locales'
import { useTheme } from '../../../../theme'

const side = Dimensions.get('screen').width * 0.45

export type BookTileItemProps = {
  title: string
  emoji: string
  currency: string
  isDefault?: boolean
  onPress: () => void
}

export const BookTileItem = ({ title, emoji, currency, isDefault, onPress }: BookTileItemProps) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height: side - 20,
          width: side,
          backgroundColor: colors.tile,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text
        style={{ ...styles.title, color: colors.foreground }}
        numberOfLines={1}
        ellipsizeMode="middle">
        {`${title} (${currency})`}
      </Text>
      {isDefault && (
        <View style={styles.chipContainer}>
          <Chip text={i18n.t('common.default')} />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    paddingBottom: 20,
  },
  emoji: {
    textAlign: 'center',
    fontSize: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  chipContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
