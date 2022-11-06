import { MaterialIcons } from '@expo/vector-icons'
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
  const navigation = useNavigation()

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        navigation.goBack()
      }}>
      <MaterialIcons name="arrow-back-ios" color={colors.text} size={24} />
    </TouchableOpacity>
  )

  const Title = () => (
    <View style={styles.titleView}>
      {title && <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>}
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
    position: 'absolute',
    top: 0,
    left: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
