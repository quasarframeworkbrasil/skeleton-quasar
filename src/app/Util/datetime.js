import dayJS from 'dayjs'

/**
 * @param {string} date
 * @param {string} format
 * @returns {string}
 */
export const format = (date, format = 'DD/MM/YYYY') => {
  return dayJS(date).format(format)
}
