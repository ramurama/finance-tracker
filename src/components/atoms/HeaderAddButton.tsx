import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { useTheme } from '../../theme'

export type HeaderAddButtonProps = {
  onPress: () => void
}

export const HeaderAddButton: FC<HeaderAddButtonProps> = ({ onPress }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity style={styles.iconTouchable} onPress={onPress}>
      <MaterialIcons name="add" size={24} color={colors.foreground} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconTouchable: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
})
