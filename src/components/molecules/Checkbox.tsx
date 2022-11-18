import CheckboxInput, { CheckboxProps as CheckboxInputProps } from 'expo-checkbox'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { Label, LabelProps } from '../atoms'

export type CheckboxProps = LabelProps & CheckboxInputProps

export const Checkbox: FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <CheckboxInput style={styles.checkbox} {...props} />
      <Label label={label} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  checkbox: {
    marginRight: 10,
  },
})
