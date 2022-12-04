import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import * as Animated from 'react-native-animatable'

import { useTheme } from '../../../theme'

export type FeedbackAnimatedProps = {
  onFeedbackEnd: () => void
}

export const FeedbackAnimated = ({ onFeedbackEnd }: FeedbackAnimatedProps) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ ...styles.animated, backgroundColor: colors.successLight }}
        animation="bounceIn"
        easing="ease-in"
        duration={500}
        onAnimationEnd={() => {
          setTimeout(() => {
            onFeedbackEnd()
          }, 500)
        }}>
        <MaterialIcons name="done" color={colors.white} size={80} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animated: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 150,
    width: 150,
  },
})
