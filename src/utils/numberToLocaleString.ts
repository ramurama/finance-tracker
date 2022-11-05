import { locale } from '../locales'

export function numberToLocaleString(value: number) {
  return Number(value).toLocaleString(locale.replace('_', '-'))
}
