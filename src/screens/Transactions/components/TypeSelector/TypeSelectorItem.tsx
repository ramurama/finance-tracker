import { Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../../../theme'
import { styles } from './styles'

export type TypeSelectorItemProps = {
  name: string
  onPress: () => void
  selected?: boolean
}

export const TypeSelectorItem = (props: TypeSelectorItemProps) => {
  const { name, onPress, selected } = props
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { ...styles.itemContainer, backgroundColor: colors.secondaryBackground },
        selected
          ? { ...styles.selectedItemContainer, borderColor: colors.secondaryForeground }
          : {},
      ]}>
      <Text style={{ ...styles.itemName, color: colors.secondaryForeground }}>{name}</Text>
    </TouchableOpacity>
  )
}
