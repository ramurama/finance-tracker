export type ColorType = {
  background: string
  secondaryBackground: string
  text: string
  secondaryText: string
  grey: string
  tabIconActiveColor: string
  tabIconInactiveColor: string
  error: string
  borderColor: string
  inputFieldBgColor: string
}

export const lightColors: ColorType = {
  background: '#f5f5f5',
  secondaryBackground: '#e0e0e0',
  text: '#1b1b1b',
  secondaryText: '#616161',
  tabIconActiveColor: '#212121',
  tabIconInactiveColor: '#bdbdbd',
  error: '#fc050d',
  borderColor: '#bab8b8',
  inputFieldBgColor: '#f5f5f5',
  grey: '#bdbdbd',
} as const

export const darkColors: ColorType = {
  background: '#1b1b1b',
  secondaryBackground: '#424242',
  text: '#ffffff',
  secondaryText: '#e0e0e0',
  tabIconActiveColor: '#f2f2f2',
  tabIconInactiveColor: '#616161',
  error: '#fc050d',
  borderColor: '#525050',
  inputFieldBgColor: '#1b1b1b',
  grey: '#616161',
} as const
