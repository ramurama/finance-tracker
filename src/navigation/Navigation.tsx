import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { FC, PropsWithChildren } from 'react'
import { connect } from 'react-redux'

import { useTheme } from '../theme'
import { ThemeType } from '../theme/ThemeContext'

type NavigationProps = { theme: ThemeType } & PropsWithChildren

const Navigation: FC<NavigationProps> = ({ theme, children }) => {
  const { isDark, colors, setScheme } = useTheme()

  if (theme !== 'system') {
    setScheme(theme)
  }

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} animated backgroundColor={colors.background} />
      {children}
    </NavigationContainer>
  )
}

const mapStateToProps = (state: any) => ({
  theme: state.settings.theme,
})

export default connect(mapStateToProps)(Navigation)
