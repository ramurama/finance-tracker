import { Text } from 'react-native'

import { Container } from '../../components'
import { useTheme } from '../../theme'

export const CategoriesList = () => {
  const { colors } = useTheme()

  return (
    <Container>
      <Text style={{ color: colors.text }}>Categories list screen</Text>
    </Container>
  )
}
