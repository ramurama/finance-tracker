import { FC } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { HeaderAddButton } from '../../components/atoms'
import { Header } from '../../components/molecules'
import { BookEntity } from '../../db/entities/Book.entity'
import { i18n } from '../../locales'
import { setBooks as setBooksAction } from '../../redux/actions'
import { BookItem, EmptyBooks } from './components'
import { useBookList } from './useBookList'

export type BooksListProps = {
  books: BookEntity[]
  setBooks: (books: BookEntity[]) => void
}

const BookList: FC<BooksListProps> = ({ books, setBooks }) => {
  const { longPressHandler, goToCreateMode } = useBookList({ setBooks })

  // TODO: change book listing design
  const Books = () => (
    <FlatList
      data={books}
      extraData={books}
      ListEmptyComponent={<EmptyBooks />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <BookItem
          key={item.id}
          title={item.name}
          emoji={item.emoji}
          currency={item.currencySymbol}
          isDefault={Boolean(item.isDefault)}
          onPress={() => {}}
          onLongPress={() => longPressHandler(item)}
        />
      )}
    />
  )

  const AddBook = () => <HeaderAddButton onPress={goToCreateMode} />

  return (
    <Container>
      <Header title={i18n.t('books.books')} iconRight={<AddBook />} backButton />
      <Books />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  books: state.books.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
  setBooks: (books: BookEntity[]) => dispatch(setBooksAction(books)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
