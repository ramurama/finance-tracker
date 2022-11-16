import { FC, ReactNode } from 'react'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { useTheme } from '../../theme'

export type EmptyListProps = {
  icon: ReactNode
  caption: string
  suggestion: string
  onPress: () => void
}

export const EmptyList: FC<EmptyListProps> = ({ icon, caption, suggestion, onPress }) => {
  const { colors } = useTheme()

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {icon}
        <Text style={{ ...styles.emptyMessageText, color: colors.text }}>{caption}</Text>
        <Text style={{ ...styles.createBookText, color: colors.greyText }}>{suggestion}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height - 150,
  },
  emptyMessageText: {
    fontSize: 18,
    fontWeight: '900',
  },
  createBookText: {
    fontSize: 15,
    fontWeight: '600',
  },
})
