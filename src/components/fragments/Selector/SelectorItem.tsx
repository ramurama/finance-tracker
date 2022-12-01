import { Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../../theme'
import { styles } from './styles'

export type SelectorItemProps = {
  emoji: string
  name: string
  selected: boolean
  onPress: () => void
}

export const SelectorItem = (props: SelectorItemProps) => {
  const { emoji, name, selected, onPress } = props

  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[
        { ...styles.itemContainer, borderColor: colors.borderColor },
        selected ? { borderColor: colors.secondaryForeground } : {},
      ]}
      onPress={onPress}>
      <Text style={styles.itemEmoji}>{emoji}</Text>
      <Text style={{ ...styles.itemName, color: colors.foreground }}>{name}</Text>
    </TouchableOpacity>
  )
}
