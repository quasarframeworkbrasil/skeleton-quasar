import { LocalStorage, SessionStorage } from 'quasar'

/**
 * @param value
 */
const parse = (value) => value === 'undefined' ? undefined : value

/**
 * @param {string} index
 * @param {Boolean} remember
 * @returns {*}
 */
export const read = (index, remember = true) => {
  if (remember) {
    return parse(LocalStorage.getItem(index))
  }
  return parse(SessionStorage.getItem(index))
}

/**
 * @param {string} index
 * @param {*} value
 * @param {boolean} remember
 * @returns {*}
 */
export const write = (index, value, remember = true) => {
  if (remember) {
    return LocalStorage.set(index, value)
  }
  return SessionStorage.set(index, value)
}

/**
 * @param {string} index
 * @param {boolean} remember
 * @returns {*}
 */
export const erase = (index, remember = true) => {
  if (remember) {
    return LocalStorage.remove(index)
  }
  return SessionStorage.remove(index)
}
