import { Container } from '../../components'
import { BookItem } from './components/BookItem'

export const BookList = () => {
  return (
    <Container>
      <BookItem title="Germany" currency="EUR" onPress={() => {}} isDefault />
      <BookItem title="India" currency="INR" onPress={() => {}} />
    </Container>
  )
}
