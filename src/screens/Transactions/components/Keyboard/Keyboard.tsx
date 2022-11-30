import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

export type KeyboardProps = {}

export const Keyboard: FC<KeyboardProps> = ({}) => {
  return (
    <View style={styles.container}>
      <></>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
