export const colorMap = {
  negative: 'red',
  positive: 'green',
  warning: 'yellow',
  info: 'aqua'
}
export const possibleColorBooleans = Object.keys(colorMap)
export const colorBooleanProps = possibleColorBooleans.reduce((acc, k) => (acc[k] = Boolean, acc), {})
