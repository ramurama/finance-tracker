import { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

import { ButtonKey } from './ButtonKey'
import { styles } from './styles'

export type KeyboardProps = {
  value: string
  onChange: (value: string) => void
  onDone: () => void
  disabled?: boolean
}

export const Keyboard: FC<KeyboardProps> = ({ value, onChange, onDone, disabled }) => {
  const Column = (props: PropsWithChildren) => <View style={styles.column}>{props.children}</View>

  const isValueZero = value === '0'

  const appendValue = (keyValue: string) => {
    if (isValueZero) {
      onChange(keyValue)
    } else {
      onChange(value + keyValue)
    }
  }

  const enableDoneBtn = !isValueZero && value.length > 0

  const ColumnLeft = () => (
    <Column>
      <ButtonKey
        value="1"
        onPress={() => {
          appendValue('1')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="4"
        onPress={() => {
          appendValue('4')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="7"
        onPress={() => {
          appendValue('7')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="."
        onPress={() => {
          appendValue('.')
        }}
        disabled={disabled || value.includes('.')}
      />
    </Column>
  )

  const ColumnMiddle = () => (
    <Column>
      <ButtonKey
        value="2"
        onPress={() => {
          appendValue('2')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="5"
        onPress={() => {
          appendValue('5')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="8"
        onPress={() => {
          appendValue('8')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="0"
        onPress={() => {
          appendValue('0')
        }}
        disabled={disabled}
      />
    </Column>
  )

  const ColumnRight = () => (
    <Column>
      <ButtonKey
        value="3"
        onPress={() => {
          appendValue('3')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="6"
        onPress={() => {
          appendValue('6')
        }}
        disabled={disabled}
      />
      <ButtonKey
        value="9"
        onPress={() => {
          appendValue('9')
        }}
        disabled={disabled}
      />
      <ButtonKey done onPress={onDone} disabled={!enableDoneBtn} />
    </Column>
  )

  return (
    <View style={styles.container}>
      <ColumnLeft />
      <ColumnMiddle />
      <ColumnRight />
    </View>
  )
}
