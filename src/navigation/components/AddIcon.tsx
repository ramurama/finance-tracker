import { MaterialIcons } from '@expo/vector-icons'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import * as Haptics from 'expo-haptics'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { useTheme } from '../../theme'

export type AddIconProps = { size: number } & BottomTabBarButtonProps

export const AddIcon: FC<AddIconProps> = ({ size, onPress }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={{ ...styles.iconView, backgroundColor: colors.text }}
      activeOpacity={0.2}
      onPress={(e) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

        if (onPress) {
          onPress(e)
        }
      }}>
      <MaterialIcons name="add" size={size} color={colors.background} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconView: {
    marginTop: 3,
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
})
