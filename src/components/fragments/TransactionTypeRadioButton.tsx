import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { i18n } from '../../locales'
import { useTheme } from '../../theme'
import { Label, LabelProps } from '../atoms'
import { RadioButtonGroup, RadioButtonGroupProps, RadioButtonItem } from '../molecules'

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
        selectedRadioColor={colors.secondaryForeground}
        deSelectedRadioColor={colors.background}
        radioStyle={styles.radio}>
        <RadioButtonItem value={1} label={i18n.t('common.expense')} />
        <RadioButtonItem value={2} label={i18n.t('common.income')} />
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
