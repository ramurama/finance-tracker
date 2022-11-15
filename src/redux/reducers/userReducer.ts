import { PURGE } from 'redux-persist/es/constants'

import { UserInfo } from '../../types/UserInfo'
import { SET_USER_INFO } from '../actions'
import { ReduxAction } from '../actionType'

type UserReducer = {
  userInfo: UserInfo
  isLoading: boolean
}

const initialState: UserReducer = {
  userInfo: {
    fullName: '',
    userIdHash: '',
  },
  isLoading: false,
}

export const userReducer = (state = initialState, action: ReduxAction<UserInfo | boolean>) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
      }
    case PURGE:
      return initialState
    default:
      return state
  }
}
