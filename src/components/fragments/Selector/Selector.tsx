import { FlatList, View } from 'react-native'

import { BookEntity } from '../../../db/entities/Book.entity'
import { CategoryEntity } from '../../../db/entities/Category.entity'
import { SelectorItem } from './SelectorItem'
import { styles } from './styles'

export type SelectorProps<T> = {
  list: T[]
  value?: number
  onChange: (bookId: number) => void
}

export const Selector = <T extends BookEntity | CategoryEntity>(props: SelectorProps<T>) => {
  const { list, value, onChange } = props

  if (list.length === 1) {
    return <View style={styles.selectorContainer} />
  }

  return (
    <View style={styles.selectorContainer}>
      <FlatList
        data={list}
        extraData={list}
        renderItem={({ item }) => (
          <SelectorItem
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
    </View>
  )
}
