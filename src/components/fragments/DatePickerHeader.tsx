import { AntDesign } from '@expo/vector-icons'
import { format } from 'date-fns'
import { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { i18n } from '../../locales'
import { useTheme } from '../../theme'
import { DatePicker, DatePickerProps, Header } from '../molecules'

export type DatePickerHeaderProps = {} & Omit<DatePickerProps, 'maxDate'>

export const DatePickerHeader: FC<DatePickerHeaderProps> = ({ value, onChange }) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
  const { colors } = useTheme()

  const formatDate = (date: Date) => format(date, 'dd. MMM')

  const formattedDate = formatDate(new Date(value))

  const formatWeekDay = (date: Date) =>
    formatDate(new Date()) === formattedDate ? i18n.t('common.today') : format(date, 'EEE')

  const RecurringTransactionButton = () => (
    <TouchableOpacity style={styles.recurringTransactionButton}>
      <AntDesign name="retweet" size={20} color={colors.foreground} />
    </TouchableOpacity>
  )

  const TouchableDateText = () => (
    <TouchableOpacity
      style={{ ...styles.headerTitleChip, backgroundColor: colors.secondaryBackground }}
      onPress={() => {
        setDatePickerVisible(true)
      }}>
      <Text
        style={{
          ...styles.headerTitle,
          color: colors.foreground,
        }}>
        {formattedDate}
      </Text>
    </TouchableOpacity>
  )

  const HeaderComponent = () => (
    <Header iconRight={<RecurringTransactionButton />}>
      <View style={styles.titleContainer}>
        <Text style={{ ...styles.headerTitle, color: colors.foreground }}>
          {formatWeekDay(new Date(value)) + ', '}
        </Text>
        <TouchableDateText />
      </View>
    </Header>
  )

  const DatePickerComponent = () => (
    <DatePicker
      value={value}
      maxDate={new Date()}
      onChange={(dateString) => {
        setDatePickerVisible(false)
        onChange(dateString)
      }}
    />
  )

  return (
    <>
      <HeaderComponent />
      {datePickerVisible && <DatePickerComponent />}
    </>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitleChip: {
    borderRadius: 25,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recurringTransactionButton: {
    height: 30,
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
