import { Text } from 'react-native'

import { Container } from '../../components'
import { useTheme } from '../../theme'

export const Reports = () => {
  const { colors } = useTheme()

  return (
    <Container>
      <Text style={{ color: colors.foreground }}>Reports screen</Text>
    </Container>
  )
}
