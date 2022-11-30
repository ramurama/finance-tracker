import { FlatList } from 'react-native'

import { BookEntity } from '../../../../db/entities/Book.entity'
import { BookSelectorItem } from './BookSelectorItem'

export type BookSelectorProps = {
  booksList: BookEntity[]
  value?: number
  onChange: (bookId: number) => void
}

export const BookSelector = (props: BookSelectorProps) => {
  const { booksList, value, onChange } = props

  if (booksList.length === 1) {
    return <></>
  }

  return (
    <FlatList
      data={booksList}
      extraData={booksList}
      renderItem={({ item }) => (
        <BookSelectorItem
          name={item.name}
          emoji={item.emoji}
          selected={item.id === value}
          onPress={() => {
            onChange(item.id)
          }}
        />
      )}
      horizontal
    />
  )
}
