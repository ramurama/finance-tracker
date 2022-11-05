import { ColorType } from './ThemeContext'

export const lightColors: ColorType = {
  background: 'white',
  secondaryBackground: '#f2f2f2',
  text: 'black',
  tabIconActiveColor: '#1e1e1e',
  tabIconInactiveColor: '#c5c7c5',
} as const

export const darkColors: ColorType = {
  background: 'black',
  secondaryBackground: '#1e1e1e',
  text: '#FFFFFF',
  tabIconActiveColor: '#f2f2f2',
  tabIconInactiveColor: '#545454',
} as const
