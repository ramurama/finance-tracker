import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'

import { i18n } from '../../../locales'
import { useTheme } from '../../../theme'

export type NotesInputProps = {
  value: string
  onChange: (value: string) => void
}

export const NotesInput = ({ value, onChange }: NotesInputProps) => {
  const { colors, isDark } = useTheme()

  return (
    <View style={{ ...styles.container, borderColor: colors.borderColor }}>
      <MaterialCommunityIcons name="note-text-outline" size={20} color={colors.borderColor} />
      <TextInput
        style={{
          ...styles.textInput,
          backgroundColor: colors.background,
          borderColor: colors.borderColor,
          color: colors.foreground,
        }}
        placeholderTextColor={colors.borderColor}
        placeholder={i18n.t('common.notes')}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete="off"
        value={value}
        onChangeText={onChange}
        keyboardAppearance={isDark ? 'dark' : 'light'}
        maxLength={30}
        // autoFocus
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    fontSize: 15,
    padding: 4,
    borderWidth: 0,
    borderRadius: 10,
    width: 'auto',
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    minWidth: 100,
    width: 'auto',
    maxWidth: 250,
    alignSelf: 'center',
    paddingLeft: 4,
    paddingEight: 4,
  },
})
