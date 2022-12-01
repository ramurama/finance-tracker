import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '../../../theme'

export type AmountInputProps = {
  currency: string | undefined
  value: string
  onBackspace: () => void
}

export const AmountInput = (props: AmountInputProps) => {
  const { currency, value, onBackspace } = props

  const { colors } = useTheme()

  const isValueExists = value !== '0' && (value === '.' || value.length) > 0

  const Currency = () => (
    <View style={styles.valueView}>
      <Text style={{ ...styles.currency, color: colors.grey }}>{currency}</Text>
    </View>
  )

  const Amount = () => (
    <View style={styles.valueView}>
      <Text style={{ ...styles.value, color: colors.foreground }}>{value}</Text>
    </View>
  )

  const BackspaceButton = () => (
    <TouchableOpacity
      style={{ ...styles.backspaceButton, backgroundColor: colors.secondaryBackground }}
      onPress={onBackspace}>
      <MaterialIcons name="backspace" size={18} color={colors.grey} />
    </TouchableOpacity>
  )

  return (
    <View style={{ ...styles.container }}>
      {currency && <Currency />}
      <Amount />
      {isValueExists && <BackspaceButton />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  valueView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  currency: {
    fontSize: 55,
    marginRight: 5,
  },
  value: {
    fontSize: 65,
  },
  backspaceButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    height: 32,
    width: 32,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
