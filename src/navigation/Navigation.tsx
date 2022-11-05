import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { FC, PropsWithChildren } from 'react'

import { useTheme } from '../theme'

export const Navigation: FC<PropsWithChildren> = ({ children }) => {
  const { isDark } = useTheme()

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} animated />
      {children}
    </NavigationContainer>
  )
}
