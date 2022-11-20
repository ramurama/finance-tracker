import { FC } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import DateInput from 'react-native-modern-datepicker'

import { useTheme } from '../../theme'
import { getDatePickerFormattedDate } from '../../utils'

export type DatePickerProps = {
  value: string
  maxDate: Date
  onChange: (dateString: string) => void
}

export const DatePicker: FC<DatePickerProps> = ({ value, maxDate, onChange }) => {
  const { colors } = useTheme()

  const formatDate = (date: Date) => getDatePickerFormattedDate(date)

  const dateValue = formatDate(new Date(value))

  return (
    <DateInput
      options={{
        backgroundColor: colors.secondaryBackground,
        textHeaderColor: colors.foreground,
        textDefaultColor: colors.secondaryForeground,
        selectedTextColor: colors.background,
        mainColor: colors.foreground,
        textSecondaryColor: colors.secondaryForeground,
        borderColor: colors.borderColor,
      }}
      current={dateValue}
      selected={dateValue}
      mode="calendar"
      minuteInterval={30}
      style={styles.dateInput}
      // minimumDate=""
      maximumDate={formatDate(maxDate)}
      onDateChange={onChange}
    />
  )
}

const styles = StyleSheet.create({
  dateInput: {
    borderRadius: 10,
    marginTop: Dimensions.get('screen').height / 9,
  },
})
