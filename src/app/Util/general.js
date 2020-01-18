import { $router } from 'src/router'
import { replacement } from './string'
import * as uuidV1 from 'uuid/v1'
import { SEPARATION_OPERATOR } from 'src/settings/schema'

/**
 * @param {Object} element
 * @param {String|Array} path
 * @param {*} fallback
 * @returns {*}
 */
export const get = (element, path, fallback = undefined) => {
  if (element === undefined || element === null) {
    return fallback
  }

  const search = Array.isArray(path)
    ? path
    : path.split('.').filter((pieces) => pieces && pieces.length)

  if (!search.length) {
    return element
  }

  let property = search.shift()
  if (Array.isArray(element)) {
    // eslint-disable-next-line no-useless-escape
    property = String(property).replace(/[\[\]]+/g, '')
  }
  return get(element[property], search, fallback)
}

/**
 * @param {Object|Array} element
 * @param {string|Array} path
 * @param {*} value
 * @returns {boolean}
 */
export const set = (element, path, value) => {
  if (Object(element) !== element) {
    // When obj is not an object
    return element
  }
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || []
  }

  /*
   * @param {*} accumulator
   * @param {*} current
   * @param {*} key
   */
  const reducer = (accumulator, current, key) => {
    const value = Object(
      accumulator[current]) === accumulator[current] // Does the key exist and is its value an object?
      // Yes: then follow that path
      ? accumulator[current]
      // No: create the key. Is the next key a potential array-index?
      : accumulator[current] = Math.abs(path[key + 1]) >> 0 === +path[key + 1]
        ? [] // Yes: assign a new array object
        : {} // No: assign a new plain object
    return value
  }

  path.slice(0, -1).reduce(reducer, element)[path[path.length - 1]] = value // Finally assign the value to the last key
  return element // Return the top-level object to allow chaining
}

/**
 * @param target
 * @param options
 */
export const browse = (target, options = undefined) => {
  if (typeof target === 'undefined') {
    return
  }

  if (typeof target === 'string' && options && options.blank) {
    window.location.assign(target)
    return
  }

  if (typeof target === 'number') {
    $router.go(target)
    return
  }

  if (typeof target === 'string') {
    target = { path: target, query: {} }
  }

  if (options === true || (options && typeof options === 'object' && options.keep)) {
    target.query = { ...$router.currentRoute.query, ...target.query }
  }
  if (options && typeof options === 'object' && options.exclude) {
    delete target.query[options.exclude]
  }

  const regex = (expression) => new RegExp(`:${expression}`, 'g')
  target.path = replacement(target.path, $router.currentRoute.params, regex)

  $router.push(target)
}

/**
 * @param {*} element
 * @param {Function} action
 * @returns {*}
 */
export const clone = (element, action = (value) => value) => {
  // Handle the 3 simple types, and null or undefined
  if (element === null || element === undefined || typeof element !== 'object') {
    return action(element)
  }

  // Handle File
  if (element instanceof File) {
    return new File([element], element.name)
  }

  // Handle Date
  if (element instanceof Date) {
    const date = new Date()
    date.setTime(element.getTime())
    return action(date)
  }

  // Handle Array
  if (element instanceof Array) {
    return element.map((item) => clone(item, action))
  }

  // Handle Object
  if (element instanceof Object) {
    const reduce = (accumulate, property) => {
      accumulate[property] = clone(element[property], action)
      return accumulate
    }
    return Object.keys(element).reduce(reduce, {})
  }

  throw new Error('Unable to copy element! Its type isn\'t supported.')
}

/**
 * @returns {string}
 */
export const uuid = () => {
  return uuidV1()
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function is (value) {
  if (typeof value === 'string') {
    return value.length > 0
  }
  if (typeof value === 'number') {
    return true
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0
  }
  return !!value
}

/**
 * Deep merge two objects.
 *
 * @param target
 * @param sources
 */
export const mergeDeep = (target, ...sources) => {
  if (!sources.length) {
    return target
  }

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (!source.hasOwnProperty(key)) {
        continue
      }

      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        mergeDeep(target[key], source[key])
        continue
      }

      Object.assign(target, { [key]: source[key] })
    }
  }

  return mergeDeep(target, ...sources)
}

/**
 * @param {Object} object
 * @param {string} prefix
 * @returns {string}
 */
export const serialize = (object, prefix = '') => {
  const string = []
  for (let property in object) {
    if (!object.hasOwnProperty(property)) {
      continue
    }
    let key = prefix ? `${prefix}[${property}]` : property
    let value = object[property]
    if (value === undefined) {
      continue
    }
    let serialized = `${key}=${value}`
    if (typeof value === 'object') {
      serialized = serialize(value, key)
    }
    string.push(serialized)
  }
  return string.join('&')
}

/**
 * @param {string} url
 * @param {string} prefix
 * @returns {Object}
 */
export const unSerialize = (url, prefix = '') => {
  const object = {}
  const regex = /(^|&)([^=]+)=([^&]+)/g
  let matches
  let key
  let value

  while ((matches = regex.exec(url)) !== null) {
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++
    }
    matches.forEach((match, groupIndex) => {
      if (groupIndex === 0 || groupIndex === 1) {
        return
      }
      if (groupIndex === 2) {
        key = !prefix ? match : match.substring(prefix.length + 1, match.length - 1)
        return
      }
      value = match
    })
    if (!key || !value) {
      continue
    }
    object[key] = value
  }
  return object
}

/**
 * @param {string|number} value
 * @param {string} operator
 * @returns {string}
 */
export const withSeparator = (value, operator) => {
  if (operator) {
    return `${operator}${SEPARATION_OPERATOR}${value}`
  }
  if (typeof value === 'number' || !isNaN(Number(operator))) {
    return `eq${SEPARATION_OPERATOR}${value}`
  }
  return `like${SEPARATION_OPERATOR}${value}`
}

/**
 * @param string
 */
export const withoutSeparator = (string) => {
  return String(string.split(SEPARATION_OPERATOR).pop())
}

/**
 * @param {*} response
 * @param {number} time
 * @returns {Promise<any>}
 */
export const resolve = (response, time = 500) => {
  return new Promise(function (resolve) {
    window.setTimeout(() => resolve(response), time)
  })
}

/**
 * @param {*} response
 * @param {number} time
 * @returns {Promise<any>}
 */
export const reject = (response, time = 500) => {
  return new Promise(function (resolve, reject) {
    window.setTimeout(() => reject(response), time)
  })
}

/**
 * @param {Array} options
 * @param {*} value
 * @returns {*}
 */
export const findValueInOptions = (options, value) => {
  const element = options.find((option) => String(option.value) === String(value))
  if (element && element.label) {
    return element.label
  }
  return value
}

/**
 * @param {Function|Object} value
 * @returns {*}
 */
export const run = (value) => {
  return clone(typeof value === 'function' ? value() : value)
}

/**
 * @param {Object} payload
 * @param {number} timeout
 * @return {Promise<unknown>}
 */
export const promisify = (payload, timeout = 800) => {
  return new Promise(function (resolve) {
    const handler = () => resolve(payload)
    window.setTimeout(handler, timeout)
  })
}
