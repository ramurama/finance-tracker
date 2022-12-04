import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../../theme'
import { TransactionType } from '../../../types'
import { AmountInput } from './AmountInput'
import { NotesInput } from './NotesInput'
import { TypeSelector } from './TypeSelector'

export type TransactionMainInputsProps = {
  currency: string | undefined
  amount: string
  onChangeAmount: (value: string) => void
  notes: string
  onChangeNotes: (value: string) => void
  type: TransactionType
  onChangeType: (type: TransactionType) => void
}

export const TransactionMainInputs = ({
  currency,
  amount,
  onChangeAmount,
  notes,
  onChangeNotes,
  type,
  onChangeType,
}: TransactionMainInputsProps) => {
  const { colors } = useTheme()

  const Currency = () => (
    <View style={styles.currencyView}>
      <Text style={{ ...styles.currency, color: colors.grey }}>{currency}</Text>
    </View>
  )

  return (
    <View style={styles.inputContainer}>
      <View style={{ ...styles.container }}>
        {currency && <Currency />}
        <AmountInput value={amount} onChange={onChangeAmount} />
      </View>
      <TypeSelector value={type} onChange={onChangeType} />
      <NotesInput value={notes} onChange={onChangeNotes} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currency: {
    fontSize: 55,
    marginRight: 5,
  },
  currencyView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})
