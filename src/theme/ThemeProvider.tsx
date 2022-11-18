import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { connect } from 'react-redux'

import { darkColors, lightColors } from './colors'
import { ThemeContext, ThemeType } from './ThemeContext'

type ThemeProviderProps = { theme: ThemeType } & PropsWithChildren

const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    if (theme === 'system') {
      setIsDark(colorScheme === 'dark')
    } else if (theme === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [colorScheme, theme])

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: ThemeType) => setIsDark(scheme === 'dark'),
    systemScheme: colorScheme,
  }

  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>
}

const mapStateToProps = (state: any) => ({
  theme: state.settings.theme,
})

export default connect(mapStateToProps)(ThemeProvider)
