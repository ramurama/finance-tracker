import { createContext } from 'react'

import { lightColors } from './colors'

export type ThemeType = 'dark' | 'light'

export type ColorType = {
  background: string
  secondaryBackground: string
  text: string
  secondaryText: string
  tabIconActiveColor: string
  tabIconInactiveColor: string
}

interface ThemeContextData {
  isDark: boolean
  colors: ColorType
  setScheme: (scheme: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextData>({
  isDark: false,
  colors: lightColors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setScheme: (scheme: ThemeType) => {},
})
