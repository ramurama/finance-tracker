import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import { darkColors, lightColors } from './colors'
import { ThemeContext, ThemeType } from './ThemeContext'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    setIsDark(colorScheme === 'dark')
  }, [colorScheme])

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: ThemeType) => setIsDark(scheme === 'dark'),
    systemScheme: colorScheme,
  }

  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>
}
