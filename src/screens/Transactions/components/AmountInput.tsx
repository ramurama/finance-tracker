import { StyleSheet, TextInput, View } from 'react-native'

import { useTheme } from '../../../theme'

export type AmountInputProps = {
  value: string
  onChange: (value: string) => void
}

export const AmountInput = ({ value, onChange }: AmountInputProps) => {
  const { colors, isDark } = useTheme()

  return (
    <View style={styles.valueView}>
      <TextInput
        style={{ ...styles.value, color: colors.foreground }}
        value={value}
        keyboardType="decimal-pad"
        keyboardAppearance={isDark ? 'dark' : 'light'}
        onChangeText={onChange}
        placeholder="0"
        spellCheck={false}
        autoCapitalize="none"
        maxLength={9}
        autoFocus
      />
    </View>
  )
}

const styles = StyleSheet.create({
  valueView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  value: {
    fontSize: 65,
  },
})
