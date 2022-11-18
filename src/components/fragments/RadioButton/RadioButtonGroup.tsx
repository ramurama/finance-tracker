import { createContext, FC, PropsWithChildren } from 'react'
import { View, ViewStyle } from 'react-native'

type RadioButtonGroupContextProps = {
  selected: string | number
  onSelected: (selected: string | number) => void
} & Partial<{
  containerStyle: ViewStyle
  containerOptionStyle: ViewStyle
  radioStyle: ViewStyle
  selectedRadioColor: string
  deSelectedRadioColor: string
}>

export const RadioGroupContext = createContext<RadioButtonGroupContextProps>({})

const { Provider } = RadioGroupContext

export type RadioButtonGroupProps = RadioButtonGroupContextProps & PropsWithChildren

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  selected,
  onSelected,
  containerStyle,
  containerOptionStyle,
  radioStyle,
  selectedRadioColor,
  deSelectedRadioColor,
  children,
}) => {
  return (
    <Provider
      value={{
        onSelected,
        selected,
        containerStyle,
        containerOptionStyle,
        radioStyle,
        selectedRadioColor,
        deSelectedRadioColor,
      }}>
      <View style={containerStyle}>{children}</View>
    </Provider>
  )
}
