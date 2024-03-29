import { FC, PropsWithChildren } from 'react'
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import { useTheme } from '../theme'

export type ContainerProps = PropsWithChildren & {
  modal?: boolean
  noDismissKeyboard?: boolean
}

export const Container: FC<ContainerProps> = ({ children, modal, noDismissKeyboard }) => {
  const { colors } = useTheme()

  return (
    <TouchableWithoutFeedback
      onPress={noDismissKeyboard ? undefined : Keyboard.dismiss}
      style={{ backgroundColor: colors.background }}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: colors.background },
          Platform.OS === 'android' && !modal ? styles.margin : {},
        ]}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  margin: {
    paddingTop: 35,
  },
})
