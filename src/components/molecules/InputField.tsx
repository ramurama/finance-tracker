import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { Input, InputError, InputErrorProps, InputProps, Label, LabelProps } from '../atoms'

export type InputFieldProps = {} & InputProps & InputErrorProps & LabelProps

export const InputField: FC<InputFieldProps> = ({ label, error, ...inputProps }) => {
  return (
    <View style={styles.container}>
      <Label label={label} />
      <Input {...inputProps} />
      <InputError error={error} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    paddingTop: 0,
  },
})
