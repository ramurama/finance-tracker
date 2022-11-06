import { ColorType } from './ThemeContext'

export const lightColors: ColorType = {
  background: '#f5f5f5',
  secondaryBackground: '#e0e0e0',
  text: '#1b1b1b',
  secondaryText: '#616161',
  tabIconActiveColor: '#212121',
  tabIconInactiveColor: '#bdbdbd',
} as const

export const darkColors: ColorType = {
  background: '#1b1b1b',
  secondaryBackground: '#424242',
  text: '#ffffff',
  secondaryText: '#e0e0e0',
  tabIconActiveColor: '#f2f2f2',
  tabIconInactiveColor: '#616161',
} as const
