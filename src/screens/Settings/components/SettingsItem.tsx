import { FontAwesome } from '@expo/vector-icons'
import { FC, ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Label } from '../../../components/atoms'
import { useTheme } from '../../../theme'

export type SettingsItemProps = {
  label: string
  value?: string | number
  onPress?: () => void
  rightIcon?: ReactNode
  toggle?: boolean
  onToggleChange?: (value: boolean) => void
}

export const SettingsItem: FC<SettingsItemProps> = ({
  label,
  value,
  onPress,
  rightIcon,
  // toggle,
  // onToggleChange,
}) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, borderBottomColor: colors.listItemBorderColor }}>
      <View style={styles.labelContainer}>
        <Label label={label} bigFont />
      </View>
      {value && (
        <View style={styles.valueContainer}>
          <Label label={value.toString()} bigFont />
          {rightIcon && (
            <FontAwesome
              name="angle-right"
              size={25}
              color={colors.foreground}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
  },
  labelContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightIcon: {
    marginLeft: 15,
  },
})
