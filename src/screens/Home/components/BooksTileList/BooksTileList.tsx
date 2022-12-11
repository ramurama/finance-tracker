import { ReactNode } from 'react'
import { FlatList } from 'react-native'

import { BookEntity } from '../../../../db/entities/Book.entity'
import { GoToBooksButton } from '../GoToBooksButton'
import { BookTileItem } from './BookTileItem'

export type BooksTileProps = {
  list: BookEntity[]
  header: ReactNode
}

const numOfColumns = 2

export const BooksTileList = ({ list, header }: BooksTileProps) => {
  return (
    <FlatList
      data={list}
      extraData={list}
      numColumns={numOfColumns}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<>{header}</>}
      ListFooterComponent={<GoToBooksButton />}
      renderItem={({ item }) => (
        <BookTileItem
          title={item.name}
          emoji={item.emoji}
          currency={item.currencySymbol}
          onPress={() => {}}
          isDefault={Boolean(item.isDefault)}
        />
      )}
    />
  )
}
