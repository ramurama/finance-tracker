import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import * as Haptics from 'expo-haptics'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { useTheme } from '../../theme'

export type AddLogTabButtonProps = BottomTabBarButtonProps

export const AddLogTabButton: FC<AddLogTabButtonProps> = ({ onPress, children }) => {
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
      {children}
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
