import { ColorType } from './ThemeContext'

export const lightColors: ColorType = {
  background: '#f2f2f2',
  secondaryBackground: '#f2f2f2',
  text: '#212121',
  tabIconActiveColor: '#212121',
  tabIconInactiveColor: '#bdbdbd',
} as const

export const darkColors: ColorType = {
  background: '#212121',
  secondaryBackground: '#212121',
  text: '#ffffff',
  tabIconActiveColor: '#f2f2f2',
  tabIconInactiveColor: '#616161',
} as const
