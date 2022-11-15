import { FC, PropsWithChildren } from 'react'
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { useTheme } from '../theme'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  const { colors } = useTheme()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
