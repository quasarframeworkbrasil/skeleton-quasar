import { get, mergeDeep } from 'src/app/Util/general'
import messages from './messages'

let __messages = messages

/**
 * Start with a default locale
 * @type {string}
 */
let __locale = String(process.env.VUE_APP_LOCALE)

/**
 * Set the current locale
 * @param {string} newLocale
 */
export const setLocale = (newLocale) => {
  __locale = newLocale
}

/**
 * Get the current locale
 * @returns {string}
 */
export const getLocale = () => {
  return __locale
}

/**
 * Set the messages
 * Can be used to replace or add new messages
 * @param {string} alias
 * @param {Record} newLocale
 * @param {boolean} merge
 */
export const setMessages = (alias, newLocale, merge = false) => {
  if (merge) {
    __messages[alias] = mergeDeep(__messages[alias], newLocale)
    return
  }
  __messages[alias] = newLocale
}

/**
 * Get the messages
 * @param {string} alias
 * @returns {Record}
 */
export const getMessages = (alias) => {
  return __messages[alias]
}

/**
 * Lang is a featured i18n engine
 * We can change the locale and add more messages in realtime
 * I do not like some things in vue-i18n and other libs that I've tested, so that's it
 * @param {string|array} path
 * @param {string} fallback
 * @returns {*}
 */
export default (path, fallback = '') => {
  if (Array.isArray(path)) {
    for (const candidate in path) {
      if (!path.hasOwnProperty(candidate)) {
        continue
      }
      const answer = get(__messages[__locale], path[candidate])
      if (answer) {
        return answer
      }
    }
    return fallback
  }
  return get(__messages[__locale], path, fallback)
}
