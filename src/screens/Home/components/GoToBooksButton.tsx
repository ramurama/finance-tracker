import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { i18n } from '../../../locales'
import { routes } from '../../../navigation/routes'
import { useTheme } from '../../../theme'

export const GoToBooksButton = ({}) => {
  const { colors } = useTheme()

  const { navigate } = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate(routes.BOOKS_NAV)
      }}>
      <Text style={{ ...styles.text, color: colors.foreground }}>{i18n.t('home.goToBooks')}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
})
