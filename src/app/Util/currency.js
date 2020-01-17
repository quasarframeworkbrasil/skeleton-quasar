/**
 * @param value
 * @param {currency} precision
 * @param {string} thousands
 * @param {string} decimal
 * @param {string} currency
 * @returns {string}
 */
export const money = (
  value,
  precision = 2,
  thousands = '.',
  decimal = ',',
  currency = 'R$ '
) => {
  const pieces = Number(value).toFixed(precision).split('.')
  const left = pieces[0]
  const right = (pieces.length === 1 ? '' : pieces[1]).padEnd(precision, '0')
  // noinspection RegExpRedundantEscape
  const answer = left
    .reverse()
    .replace(/(\d{3})/g, `$1${thousands}`)
    .reverse()
    .replace(new RegExp(`^\\${thousands}`, 'g'), '')
    .concat(`${decimal}${right}`)
  if (!currency) {
    return answer
  }
  return `${currency}${answer}`
}

/**
 * @param {number} value
 * @returns {string}
 */
export const moneyWithoutCurrency = (value) => {
  return money(value, undefined, undefined, undefined, '')
}

/**
 * @param value
 * @param {string} thousands
 * @param {string} decimal
 * @param {string} currency
 * @returns {number | *}
 */
export const unMoney = (
  value,
  thousands = '.',
  decimal = ',',
  currency = 'R$ '
) => {
  // noinspection RegExpRedundantEscape
  const string = String(value)
    .replace(currency, '')
    .replace(new RegExp(`\\${thousands}`, 'g'), '')
    .replace(new RegExp(`\\${decimal}`, 'g'), '.')
  return Number(string)
}
