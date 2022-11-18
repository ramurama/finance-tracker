import { FC, useContext } from 'react'
import { FlexStyle, StyleSheet, TouchableOpacity, View } from 'react-native'

import { Label } from '../../atoms/Label'
import { RadioGroupContext } from './RadioButtonGroup'

export type RadioButtonItemProps = {
  value: string | number
  label: string
  style?: FlexStyle
}

export const RadioButtonItem: FC<RadioButtonItemProps> = ({ value, label, style }) => {
  const {
    onSelected,
    selected,
    containerOptionStyle,
    radioStyle,
    selectedRadioColor,
    deSelectedRadioColor,
  } = useContext(RadioGroupContext)

  function getBackground() {
    if (selectedRadioColor) {
      return selectedRadioColor
    }

    return 'red'
  }

  return (
    <TouchableOpacity
      onPress={() => onSelected(value)}
      style={[styles.radioButtonItemContainer, containerOptionStyle]}>
      <View style={[styles.radioButtonCircle, radioStyle, style]}>
        <View
          style={[
            styles.radioButtonInnerCircle,
            { backgroundColor: selected === value ? getBackground() : deSelectedRadioColor },
          ]}
        />
      </View>

      <Label label={label} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  radioButtonItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonCircle: {
    borderWidth: 2,
    borderColor: '#CCC',
    padding: 2,
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonInnerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
})
