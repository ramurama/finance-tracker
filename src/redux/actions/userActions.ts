import { UserInfo } from '../../types/UserInfo'

export const SET_USER_INFO = 'SET_USER_INFO'

export const setUserInfo = (userInfo: UserInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
})
