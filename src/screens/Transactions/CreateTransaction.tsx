import { Text } from 'react-native'

import { Container } from '../../components'
import { useTheme } from '../../theme'

export const CreateTransactions = () => {
  const { colors } = useTheme()

  return (
    <Container>
      <Text style={{ color: colors.foreground }}>Create transactions screen</Text>
    </Container>
  )
}
