import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Label } from '../../../components/atoms'
import { i18n } from '../../../locales'
import { useTheme } from '../../../theme'

export const BookEmojis = ['📕', '📗', '📘', '📙']

export type BookEmojiPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const BookEmojiPicker: FC<BookEmojiPickerProps> = ({ value, onChange }) => {
  const { colors } = useTheme()

  const EmojiTouchable = ({ emoji }: { emoji: string }) => (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: colors.background,
        borderColor: value === emoji ? colors.foreground : colors.listItemBorderColor,
      }}
      onPress={() => onChange(emoji)}
      disabled={value === emoji}>
      <Text style={styles.emoji}>{emoji}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Label label={i18n.t('books.pickBookEmoji')} />
      <View style={styles.emojiContainer}>
        {BookEmojis.map((emoji) => (
          <EmojiTouchable emoji={emoji} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 5,
  },
  emoji: {
    fontSize: 24,
  },
})
