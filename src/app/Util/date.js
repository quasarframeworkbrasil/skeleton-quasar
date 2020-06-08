import DateTime from 'src/app/Support/DateTime'

/**
 * @returns {string}
 */
export const now = () => dateCurrent('YYYY-MM-DD HH:mm')

/**
 * @returns {string}
 */
export const today = () => dateCurrent('YYYY-MM-DD')

/**
 * @param {string} output
 */
export const dateCurrent = (output) => {
  return (new DateTime()).format(output)
}

/**
 * @param {string} string
 * @param {string} [format]
 * @returns {DateTime}
 */
export const dateFrom = (string, format = undefined) => {
  return DateTime.fromFormat(string, format)
}

/**
 * @param {string} string
 * @param {string} [format]
 * @returns {number}
 */
export const dateMonth = (string, format) => {
  return DateTime.fromFormat(string, format).getMonth()
}

/**
 * @param {string} string
 * @param {string} [format]
 * @returns {number}
 */
export const dateYear = (string, format) => {
  return DateTime.fromFormat(string, format).getFullYear()
}

/**
 * @param {string} string
 * @returns {boolean}
 */
export const dateIsValid = (string) => {
  return DateTime.fromFormat(string).isValid()
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareGreaterEqualThen = (base, compare, format) => {
  return DateTime.compareGreaterEqualThen(base, compare, format)
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareLessEqualThen = (base, compare, format) => {
  return DateTime.compareLessEqualThen(base, compare, format)
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareGreaterThen = (base, compare, format) => {
  return DateTime.compareGreaterThen(base, compare, format)
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareLessThen = (base, compare, format) => {
  return DateTime.compareLessThen(base, compare, format)
}
