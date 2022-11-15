// import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { Container } from '../../components'
// import { useDb } from '../../db/useDb'
import { HeaderHome } from './components/HeaderHome'

export const Home = () => {
  //   const { transactionService, categoryService, bookService } = useDb()

  //   useEffect(() => {
  //     ;

  // (async () => {
  // await bookService.createBook({
  //   name: 'Germany book',
  //   currency: 'EUR',
  // })
  // await categoryService.createCategory({
  //   name: 'Food',
  //   type: 2,
  // })
  // const category = await categoryService.getCategoryById(1)
  // console.log(category)
  // const book = await bookService.getBookById(1)
  // console.log(book)
  // const transaction = await transactionService.createTransaction({
  //   amount: 300,
  //   date: new Date(),
  //   book: {
  //     created: '2022-10-25T15:32:18.000Z',
  //     currency: 'EUR',
  //     id: 2,
  //     name: 'Germany book',
  //     updated: '2022-10-25T15:32:18.000Z',
  //   },
  //   category: {
  //     created: '2022-10-25T15:38:49.000Z',
  //     id: 6,
  //     name: 'Food',
  //     type: 2,
  //     updated: '2022-10-25T15:38:49.000Z',
  //   },
  //   type: 2,
  // })
  // console.log(transaction)
  // await categoryService.deleteCategory(4)
  // await transactionService.deleteTransaction(2)
  // console.log(await bookService.getBooks())
  // console.log(await categoryService.getCategories(2))
  // console.log(await transactionService.getTransactions(2, 2))
  // console.log(await transactionService.getTransactionsByCategory(2, 5))
  //   })()
  // }, [])

  return (
    <Container>
      <View style={{ ...styles.mainView }}>
        <HeaderHome />
      </View>
    </Container>
  )
}

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 50,
  },
})
