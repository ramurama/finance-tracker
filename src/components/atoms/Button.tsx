import { FC } from 'react'
import { FlexStyle, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { useTheme } from '../../theme'

export type ButtonProps = {
  label: string
  style?: FlexStyle
  bottom?: boolean
  fullWidth?: boolean
} & TouchableOpacityProps

export const Button: FC<ButtonProps> = ({ label, style, bottom, fullWidth, ...props }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[
        { ...styles.button, backgroundColor: colors.secondaryText },
        bottom ? styles.bottom : {},
        fullWidth ? styles.fullWidth : {},
        style,
      ]}
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
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  fullWidth: {
    width: '95%',
  },
})
