import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../../../theme'

export type BookSelectorItemProps = {
  emoji: string
  name: string
  selected: boolean
  onPress: () => void
}

export const BookSelectorItem = (props: BookSelectorItemProps) => {
  const { emoji, name, selected, onPress } = props

  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[
        { ...styles.container, borderColor: colors.borderColor },
        selected ? { borderColor: colors.secondaryForeground } : {},
      ]}
      onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={{ ...styles.name, color: colors.foreground }}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    height: 35,
  },
  emoji: {
    fontSize: 14,
  },
  name: {
    fontSize: 14,
    marginLeft: 4,
  },
})
