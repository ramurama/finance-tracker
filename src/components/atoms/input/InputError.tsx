import { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

import { useTheme } from '../../../theme'

export type InputErrorProps = {
  error?: string | undefined
  isErrorVisible?: boolean
}

export const InputError: FC<InputErrorProps> = ({ error = '', isErrorVisible = false }) => {
  const { colors } = useTheme()

  if (isErrorVisible) {
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
