import { FC, PropsWithChildren } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import { useTheme } from '../theme'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  const { colors } = useTheme()

  return (
    <>
      <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
        {children}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
