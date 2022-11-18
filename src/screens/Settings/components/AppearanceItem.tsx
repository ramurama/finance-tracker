import { useActionSheet } from '@expo/react-native-action-sheet'
import { FC } from 'react'

import { i18n } from '../../../locales'
import { useTheme } from '../../../theme'
import { ThemeType } from '../../../theme/ThemeContext'
import { capitalizeFirstLetter } from '../../../utils'
import { SettingsItem } from './SettingsItem'

export type AppearanceItemProps = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const AppearanceItem: FC<AppearanceItemProps> = ({ theme, setTheme }) => {
  const { setScheme, systemScheme } = useTheme()
  const { showActionSheetWithOptions } = useActionSheet()

  const appearanceHandler = () => {
    const options = [
      i18n.t('settings.light'),
      i18n.t('settings.dark'),
      i18n.t('settings.system'),
      i18n.t('common.cancel'),
    ]
    const cancelButtonIndex = 3

    showActionSheetWithOptions({ options, cancelButtonIndex }, (selectedIndex?: number) => {
      switch (selectedIndex) {
        case 0:
          setScheme('light')
          setTheme('light')
          break

        case 1:
          setScheme('dark')
          setTheme('dark')
          break

        case 2:
          setScheme(systemScheme)
          setTheme('system')
          break

        default:
          break
      }
    })
  }

  return (
    <SettingsItem
      label={i18n.t('settings.appearance')}
      value={capitalizeFirstLetter(theme)}
      onPress={appearanceHandler}
    />
  )
}
