import { PURGE } from 'redux-persist/es/constants'

import { ThemeType } from '../../theme/ThemeContext'
import { SET_THEME } from '../actions'
import { ReduxAction } from '../actionType'

type SettingsReducer = {
  theme: ThemeType
}

const initialState: SettingsReducer = {
  theme: 'system',
}

export const settingsReducer = (state = initialState, action: ReduxAction<ThemeType | boolean>) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case PURGE:
      return initialState
    default:
      return state
  }
}
