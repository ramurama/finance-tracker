import 'reflect-metadata'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { DBConnectionProvider } from './db/DBConnectionProvider'
import { Navigation } from './navigation/Navigation'
import { TabNavigator } from './navigation/TabNavigator'
import { persistor, store } from './redux/store'
import { defineBackgroundSyncTask } from './services/dataSync.service'
import { ThemeProvider } from './theme'

defineBackgroundSyncTask()

export default function Main() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <DBConnectionProvider>
            <ActionSheetProvider>
              <Navigation>
                <TabNavigator />
              </Navigation>
            </ActionSheetProvider>
          </DBConnectionProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
