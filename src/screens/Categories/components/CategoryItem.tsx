import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '../../../theme'
import { TransactionType } from '../../../types'

export type CategoryItemProps = {
  name: string
  type: TransactionType
  emoji: string
  onPress: () => void
  onLongPress: () => void
}

export const CategoryItem: FC<CategoryItemProps> = ({ name, emoji, onPress, onLongPress }) => {
  const { colors } = useTheme()

  const Emoji = () => (
    <View style={styles.emojiContainer}>
      <View style={{ ...styles.emojiView, borderColor: colors.borderColor }}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    </View>
  )

  const Content = () => (
    <View style={styles.content}>
      <Text style={{ ...styles.name, color: colors.foreground }}>{name}</Text>
    </View>
  )

  return (
    <TouchableOpacity
      style={{ ...styles.container, borderBottomColor: colors.listItemBorderColor }}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Emoji />
      <Content />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 1,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emojiView: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
  },
  emoji: {
    fontSize: 30,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
})
