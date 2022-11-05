import { Text } from 'react-native'

import { Container } from '../../components'
import { useTheme } from '../../theme'

export const Reports = () => {
  const { colors } = useTheme()

  return (
    <Container>
      <Text style={{ color: colors.text }}>Reports screen</Text>
    </Container>
  )
}
