import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../../../theme'
import { styles } from './styles'

export type ButtonKeyProps = {
  value?: string
  onPress: () => void
  done?: boolean
  disabled?: boolean
}

export const ButtonKey = (props: ButtonKeyProps) => {
  const { value, onPress, done, disabled } = props

  const { colors } = useTheme()

  let bgColor = colors.buttonBg

  if (done && disabled) {
    bgColor = colors.successDark
  } else if (done && !disabled) {
    bgColor = colors.successLight
  }

  return (
    <TouchableOpacity
      style={{ ...styles.buttonKeyContainer, backgroundColor: bgColor }}
      onPress={onPress}
      disabled={disabled}>
      {value && (
        <Text style={{ ...styles.buttonKeyText, color: colors.secondaryForeground }}>{value}</Text>
      )}
      {done && <MaterialIcons name="done" size={40} color={'black'} />}
    </TouchableOpacity>
  )
}
