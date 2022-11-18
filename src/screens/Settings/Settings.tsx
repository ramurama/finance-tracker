import { FC } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { Header } from '../../components/molecules'
import { i18n } from '../../locales'
import { setTheme as setThemeAction } from '../../redux/actions'
import { ThemeType } from '../../theme/ThemeContext'
import { AppearanceItem } from './components/AppearanceItem'

export type SettingsProps = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const Settings: FC<SettingsProps> = ({ theme, setTheme }) => {
  return (
    <Container>
      <Header title={i18n.t('settings.settings')} />
      <ScrollView style={styles.scrollContainer}>
        <AppearanceItem theme={theme} setTheme={setTheme} />
      </ScrollView>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  theme: state.settings.theme,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
  setTheme: (theme: ThemeType) => dispatch(setThemeAction(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
})
