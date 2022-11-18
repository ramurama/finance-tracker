import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { FC, PropsWithChildren } from 'react'

import { useTheme } from '../theme'

type NavigationProps = PropsWithChildren

export const Navigation: FC<NavigationProps> = ({ children }) => {
  const { isDark, colors } = useTheme()

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} animated backgroundColor={colors.background} />
      {children}
    </NavigationContainer>
  )
}
