import { Picker } from '@react-native-picker/picker'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { Label } from '../../../components/atoms'
import { useTheme } from '../../../theme'
import { commonCurrency, currency } from '../../../utils'

export type CurrencyPickerProps = {
  value: string
  onChange: (code: string, symbol: string) => void
  disabled?: boolean
}

export const CurrencyPicker: FC<CurrencyPickerProps> = ({ value, onChange, disabled = false }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Label label="Currency" />
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          onChange(itemValue, currency[itemValue]!.symbol)
        }}
        itemStyle={styles.pickerItem}
        enabled={!disabled}>
        {commonCurrency.map((item) => (
          <Picker.Item
            label={`${item.name} - ${item.symbol}`}
            value={item.code}
            color={colors.foreground}
            key={item.code}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  pickerItem: {
    fontSize: 14,
  },
})
