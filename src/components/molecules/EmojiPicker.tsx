import { MaterialIcons } from '@expo/vector-icons'
import { FC, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EmojiSelector from 'react-native-emoji-selector'

import { useTheme } from '../../theme'
import { InputError, InputErrorProps, Label } from '../atoms'
import { Container } from '../Container'
import { Header } from './Header'

export type EmojiPickerProps = {
  label: string
  value?: string
  onSelection: (emoji: string) => void
} & InputErrorProps

export const EmojiPicker: FC<EmojiPickerProps> = ({ label, value = '', onSelection, error }) => {
  const { colors } = useTheme()

  const [visible, setVisible] = useState<boolean>(false)
  const [selectedEmoji, setSelectedEmoji] = useState<string>(value)

  const isEmojiExists = selectedEmoji !== ''

  const EmojiTouchable = () => (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: colors.background,
        borderColor: colors.borderColor,
      }}
      onPress={() => setVisible(true)}>
      {!isEmojiExists && <MaterialIcons name="emoji-emotions" size={30} color={colors.grey} />}
      {isEmojiExists && <Text style={styles.emojiText}>{selectedEmoji}</Text>}
    </TouchableOpacity>
  )

  const EmojiInput = () => (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Label label={label} />
        <EmojiTouchable />
      </View>
      <InputError error={error} />
    </View>
  )

  const EmojiPickerModal = () => (
    <Modal visible={visible} animationType="slide" style={{ backgroundColor: colors.background }}>
      <Container>
        <Header closeButton onClose={() => setVisible(false)} />
        <View style={styles.content}>
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              onSelection(emoji)
              setSelectedEmoji(emoji)
              setVisible(false)
            }}
            theme={colors.background}
            showSearchBar={false}
            showHistory={false}
          />
        </View>
      </Container>
    </Modal>
  )

  return (
    <>
      <EmojiInput />
      <EmojiPickerModal />
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 10,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  emojiText: {
    fontSize: 30,
  },
})
