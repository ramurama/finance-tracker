import { ThemeType } from '../../theme/ThemeContext'

export const SET_THEME = 'SET_THEME'

export const setTheme = (theme: ThemeType) => ({
  type: SET_THEME,
  payload: theme,
})
