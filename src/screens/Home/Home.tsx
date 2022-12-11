import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { BookEntity } from '../../db/entities/Book.entity'
import { BooksTileList } from './components/BooksTileList'

export type HomeProps = {
  booksList: BookEntity[]
}

const Home = ({ booksList }: HomeProps) => {
  return (
    <Container>
      <View style={styles.bookList}>
        <BooksTileList list={booksList} header={<View />} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  bookList: {
    flex: 1,
  },
})

const mapStateToProps = (state: any) => ({
  booksList: state.books.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
