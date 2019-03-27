import { intl } from './config'

export function priceStr(priceInt) {
  const maximumFractionDigits = (priceInt < 0.01) ? 3 : 2
  return priceInt.toLocaleString(
    intl.locale,
    {
      style: 'currency',
      currencyDisplay: 'symbol',
      currency: intl.currency_ISO,
      maximumFractionDigits: maximumFractionDigits
    }
  )
}

export function splitPrice(price) {
  const fixed = (price < 0.01) ? price.toFixed(3) : price.toFixed(2)
  let split = fixed.toString().split('.')
  if (!Array.isArray(split)) {
    split = ['0', '00']
  }
  if (split.length === 1) {
    split[1] = '00'
  }
  if (split[1].length === 1) {
    split[1] += '0'
  }
  return split
}