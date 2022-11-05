import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { CustomButton } from '../atoms'

interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <CustomButton label={title} onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
  },
})
