import { Text } from 'react-native'

import { Container } from '../../components'
import { useTheme } from '../../theme'

export const Settings = () => {
  const { colors } = useTheme()

  return (
    <Container>
      <Text style={{ color: colors.foreground }}>Settings screen</Text>
    </Container>
  )
}
