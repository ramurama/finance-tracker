import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import { rootReducer } from './reducers/rootReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: [thunk],
})

export const persistor = persistStore(store)
