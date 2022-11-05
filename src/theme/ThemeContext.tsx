import { createContext } from 'react'

import { lightColors } from './colors'

export type ThemeType = 'dark' | 'light'

interface ThemeContextData {
  isDark: boolean
  colors: {}
  setScheme: (scheme: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextData>({
  isDark: false,
  colors: lightColors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setScheme: (scheme: ThemeType) => {},
})
