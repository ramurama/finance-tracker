import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../theme'

export type ChipProps = {
  text: string
}

export const Chip: FC<ChipProps> = ({ text }) => {
  const { colors } = useTheme()

  return (
    <View style={{ ...styles.container, backgroundColor: colors.secondaryBackground }}>
      <Text style={{ ...styles.text, color: colors.secondaryText }}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
})
