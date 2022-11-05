import * as Localisation from 'expo-localization'
import { I18n } from 'i18n-js'

import en from './en_IN'
import ta from './ta_IN'

export const i18n = new I18n({
  ['en_IN']: en,
  ['ta_IN']: ta,
})

i18n.defaultLocale = 'en_IN'

// set to user locale
i18n.locale = Localisation.locale

// !! locale to be changed on demand
// i18n.locale = 'ta_IN'

i18n.enableFallback = true

export const locale = Localisation.locale
export const decimalSeparator = Localisation.decimalSeparator
export const digitGroupingSeparator = Localisation.digitGroupingSeparator

// !! in Android, the locale can be changed on the go and the locale strings in our app may not update
// !! in such cases use this source to fix the issue: https://docs.expo.dev/versions/latest/sdk/localization/
