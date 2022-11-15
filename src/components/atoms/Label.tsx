import { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

import { useTheme } from '../../theme'

export type LabelProps = {
  label: string
}

export const Label: FC<LabelProps> = ({ label }) => {
  const { colors } = useTheme()

  return <Text style={{ ...styles.label, color: colors.secondaryText }}>{label}</Text>
}

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },
})
