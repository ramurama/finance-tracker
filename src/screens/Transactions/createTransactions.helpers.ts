export const trimAmount = (value: string, cb: (amount: string) => void) => {
  // ! this logic is to ensure that there is only one decimal point at any time
  if (value.indexOf('.') !== -1) {
    const split = value.split('.')

    if (split.length <= 2) {
      cb(value)
    }
  } else if (value.indexOf(',') !== -1) {
    const split = value.split(',')

    if (split.length <= 2) {
      cb(value)
    }
  } else {
    cb(value)
  }
}
