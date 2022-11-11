import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { useTheme } from '../../../theme'

export type InputProps = {
  value: string
  onChange: (text: string) => void
} & TextInputProps

export const Input: FC<InputProps> = ({ onChange, value, onBlur, editable = true, ...props }) => {
  const { colors } = useTheme()

  return (
    <TextInput
      style={{
        ...styles.textInput,
        backgroundColor: colors.inputFieldBgColor,
        borderColor: colors.borderColor,
        color: editable ? colors.text : colors.tabIconInactiveColor,
      }}
      placeholderTextColor={colors.tabIconInactiveColor}
      spellCheck={false}
      onChangeText={(text) => onChange(text)}
      value={value}
      onBlur={onBlur}
      editable={editable}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
  },
})
