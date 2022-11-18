import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { FC, ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '../../theme'

interface HeaderProps {
  title?: string
  iconRight?: ReactNode
  backButton?: boolean
}

export const Header: FC<HeaderProps> = ({ title, iconRight, backButton }) => {
  const { colors } = useTheme()
  const { goBack } = useNavigation()

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        goBack()
      }}>
      <Ionicons name="ios-arrow-back" color={colors.foreground} size={24} />
    </TouchableOpacity>
  )

  const Title = () => (
    <View style={styles.titleView}>
      {title && <Text style={{ ...styles.title, color: colors.foreground }}>{title}</Text>}
    </View>
  )

  const RightIcon = () => <View style={styles.iconContainer}>{iconRight}</View>

  return (
    <View style={{ ...styles.headerContainer, backgroundColor: colors.background }}>
      {backButton && <BackButton />}
      {title && <Title />}
      {iconRight && <RightIcon />}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  backButton: {
    height: 30,
    width: 40,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
})
