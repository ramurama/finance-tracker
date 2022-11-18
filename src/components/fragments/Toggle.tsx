import { FC } from 'react'
import { StyleSheet, Switch, View } from 'react-native'

import { useTheme } from '../../theme'
import { Label } from '../atoms/Label'

export type ToggleProps = {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({ label, value, onChange }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Label label={label} />
      <Switch
        trackColor={{ false: colors.secondaryBackground, true: colors.grey }}
        thumbColor={colors.foreground}
        onValueChange={() => {
          onChange(!value)
        }}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
})
