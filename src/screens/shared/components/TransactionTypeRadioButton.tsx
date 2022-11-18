import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { Label, LabelProps } from '../../../components/atoms'
import {
  RadioButtonGroup,
  RadioButtonGroupProps,
  RadioButtonItem,
} from '../../../components/fragments'
import { useTheme } from '../../../theme'

export type TransactionTypeRadioButtonProps = Pick<
  RadioButtonGroupProps,
  'selected' | 'onSelected'
> &
  LabelProps

export const TransactionTypeRadioButton: FC<TransactionTypeRadioButtonProps> = ({
  selected,
  onSelected,
  label,
}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Label label={label} />
      <RadioButtonGroup
        containerStyle={styles.radioButtonGroup}
        selected={selected}
        onSelected={onSelected}
        selectedRadioColor={colors.foreground}
        deSelectedRadioColor={colors.background}
        radioStyle={styles.radio}>
        <RadioButtonItem value={1} label="Expense" />
        <RadioButtonItem value={2} label="Income" />
      </RadioButtonGroup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  radioButtonGroup: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    marginLeft: 10,
  },
})
