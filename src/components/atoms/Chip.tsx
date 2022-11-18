import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../theme'

export type ChipProps = {
  text: string
  touchable?: boolean
  onPress?: () => void
  isActive?: boolean
}

export const Chip: FC<ChipProps> = ({ text, touchable, onPress, isActive }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      disabled={!touchable}
      onPress={() => {
        if (touchable && onPress) {
          onPress()
        }
      }}
      style={[
        { ...styles.container, backgroundColor: colors.secondaryBackground },
        isActive
          ? {
              backgroundColor: colors.background,
              borderColor: colors.listItemBorderColor,
              ...styles.activeChip,
            }
          : {},
        touchable ? styles.touchableChip : {},
      ]}>
      <Text style={{ ...styles.text, color: colors.secondaryText }}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
  touchableChip: {
    marginLeft: 10,
  },
  activeChip: {
    borderWidth: 1,
  },
})
