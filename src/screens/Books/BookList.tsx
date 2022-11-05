import { Text } from 'react-native'

import { Container } from '../../components'
import { useTheme } from '../../theme'

export const BookList = () => {
  const { colors } = useTheme()

  return (
    <Container>
      <Text style={{ color: colors.text }}>Book List screen</Text>
    </Container>
  )
}
