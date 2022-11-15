import { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

import { useTheme } from '../../../theme'

export type InputErrorProps = {
  error?: string | undefined
}

export const InputError: FC<InputErrorProps> = ({ error = '' }) => {
  const { colors } = useTheme()

  if (error.length > 0) {
    return <Text style={{ ...styles.error, color: colors.error }}>{error}</Text>
  }

  return <></>
}

const styles = StyleSheet.create({
  error: {
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingLeft: 4,
    lineHeight: 16,
  },
})
