import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../theme'

type CustomButtonProps = {
  label: string
  onPress: () => void
}

export const CustomButton: FC<CustomButtonProps> = ({ label, onPress }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={{ color: colors.text }}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
  },
})
