import 'reflect-metadata'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { DBConnectionProvider } from './db/DBConnectionProvider'
import { Navigation } from './navigation/Navigation'
import { persistor, store } from './redux/store'
import { Home } from './screens/Home/Home'
import { defineBackgroundSyncTask } from './services/dataSync.service'
import { ThemeProvider } from './theme'

defineBackgroundSyncTask()

export default function Main() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <DBConnectionProvider>
            <Navigation>
              <Home />
            </Navigation>
          </DBConnectionProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
