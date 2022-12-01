import { Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '../../../../theme'
import { styles } from './styles'

export type TypeSelectorItemProps = {
  name: string
  onPress: () => void
  selected?: boolean
  disabled: boolean
}

export const TypeSelectorItem = (props: TypeSelectorItemProps) => {
  const { name, onPress, selected, disabled } = props
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        { ...styles.itemContainer, backgroundColor: colors.secondaryBackground },
        selected
          ? { ...styles.selectedItemContainer, borderColor: colors.secondaryForeground }
          : {},
      ]}>
      <View
        style={[
          { ...styles.radioOuterCircle, borderColor: colors.grey },
          selected ? { borderColor: colors.secondaryForeground } : {},
        ]}>
        <View
          style={[
            { ...styles.radioInnerCircle, backgroundColor: colors.grey },
            selected ? { backgroundColor: colors.secondaryForeground } : {},
          ]}
        />
      </View>
      <Text style={{ ...styles.itemName, color: colors.secondaryForeground }}>{name}</Text>
    </TouchableOpacity>
  )
}
