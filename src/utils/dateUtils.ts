export function getDateStartTime(date: Date) {
  const newDate = new Date(date)

  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)

  return newDate
}

export function getDateEndTime(date: Date) {
  const newDate = new Date(date)

  newDate.setHours(23)
  newDate.setMinutes(59)
  newDate.setSeconds(59)

  return newDate
}
