import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../../theme'

export type AmountInputProps = {
  currency: string | undefined
  value: string
}

export const AmountInput = (props: AmountInputProps) => {
  const { currency, value } = props

  const { colors } = useTheme()

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

  return (
    <View style={{ ...styles.container }}>
      {currency && <Currency />}
      <Amount />
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
})
