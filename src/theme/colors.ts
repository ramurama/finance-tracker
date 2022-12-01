export type ColorType = {
  background: string
  secondaryBackground: string
  foreground: string
  secondaryForeground: string
  buttonBg: string
  grey: string
  tabIconActiveColor: string
  tabIconInactiveColor: string
  error: string
  borderColor: string
  listItemBorderColor: string
  inputFieldBgColor: string
  successLight: string
  successDark: string
}

export const lightColors: ColorType = {
  background: '#f5f5f5',
  secondaryBackground: '#e0e0e0',
  buttonBg: '#ebebeb',
  foreground: '#1b1b1b',
  secondaryForeground: '#616161',
  tabIconActiveColor: '#212121',
  tabIconInactiveColor: '#bdbdbd',
  error: '#fc050d',
  borderColor: '#bab8b8',
  listItemBorderColor: '#ededed',
  inputFieldBgColor: '#f5f5f5',
  grey: '#bdbdbd',
  successLight: '#5aad39',
  successDark: '#5a7350',
} as const

export const darkColors: ColorType = {
  background: '#1b1b1b',
  secondaryBackground: '#424242',
  buttonBg: '#2f2f2f',
  foreground: '#ffffff',
  secondaryForeground: '#e0e0e0',
  tabIconActiveColor: '#f2f2f2',
  tabIconInactiveColor: '#616161',
  error: '#fc050d',
  borderColor: '#525050',
  listItemBorderColor: '#262626',
  inputFieldBgColor: '#1b1b1b',
  grey: '#616161',
  successLight: '#5aad39',
  successDark: '#2e591d',
} as const
