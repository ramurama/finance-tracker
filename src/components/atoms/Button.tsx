import { FC } from 'react'
import { FlexStyle, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { useTheme } from '../../theme'

export type ButtonProps = {
  label: string
  style?: FlexStyle
} & TouchableOpacityProps

export const Button: FC<ButtonProps> = ({ label, style, ...props }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[{ ...styles.button, backgroundColor: colors.secondaryText }, style]}
      {...props}>
      <Text style={{ ...styles.label, color: colors.background }}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
})
