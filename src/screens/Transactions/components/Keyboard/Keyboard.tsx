import { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

import { ButtonKey } from './ButtonKey'
import { styles } from './styles'

export type KeyboardProps = {
  value: string
  onChange: (value: string) => void
}

export const Keyboard: FC<KeyboardProps> = ({ value, onChange }) => {
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
      />
      <ButtonKey
        value="4"
        onPress={() => {
          appendValue('4')
        }}
      />
      <ButtonKey
        value="7"
        onPress={() => {
          appendValue('7')
        }}
      />
      <ButtonKey
        value="."
        onPress={() => {
          appendValue('.')
        }}
        disabled={value.includes('.')}
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
      />
      <ButtonKey
        value="5"
        onPress={() => {
          appendValue('5')
        }}
      />
      <ButtonKey
        value="8"
        onPress={() => {
          appendValue('8')
        }}
      />
      <ButtonKey
        value="0"
        onPress={() => {
          appendValue('0')
        }}
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
      />
      <ButtonKey
        value="6"
        onPress={() => {
          appendValue('6')
        }}
      />
      <ButtonKey
        value="9"
        onPress={() => {
          appendValue('9')
        }}
      />
      <ButtonKey done onPress={() => {}} disabled={!enableDoneBtn} />
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
