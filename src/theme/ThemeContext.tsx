import { createContext } from 'react'

import { ColorType, lightColors } from './colors'

export type ThemeType = 'dark' | 'light' | 'system'

interface ThemeContextData {
  isDark: boolean
  colors: ColorType
  setScheme: (scheme: ThemeType) => void
  systemScheme: ThemeType
}

export const ThemeContext = createContext<ThemeContextData>({
  isDark: false,
  colors: lightColors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setScheme: (scheme: ThemeType) => {},
  systemScheme: 'dark',
})
