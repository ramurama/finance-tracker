export function formatNumberForDb(value: string) {
  return Number(value?.replace(',', '.'))
}
