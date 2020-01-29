import { get, is } from 'src/app/Util/general'
import { primaryKey } from 'src/settings/schema'
import actions from 'src/settings/actions'

/**
 * @param state
 * @returns {string}
 */
export const getToken = (state) => state.token

/**
 * @param state
 * @returns {string}
 */
export const getUser = (state) => state.user

/**
 * @param state
 * @returns {Object|undefined}
 */
export const getUserId = (state) => {
  return get(state.user, primaryKey)
}

/**
 * @param state
 * @returns {Object}
 */
export const getUserShop = (state) => {
  const shop = get(state.user, 'shop')
  if (is(shop)) {
    return shop
  }
  return {}
}

/**
 * @param state
 * @returns {Object|undefined}
 */
export const getUserShopUrl = (state) => {
  const shop = getUserShop(state)
  return shop.url || ''
}

/**
 * @param state
 * @returns {Object}
 */
export const getActions = (state) => {
  if (typeof actions === 'function') {
    return actions(state.user)
  }
  const userActions = get(state.user, 'actions')
  if (userActions) {
    return userActions
  }
  return {}
}

/**
 * @param state
 * @returns {Array}
 */
export const getPermissions = (state) => {
  const actions = getActions(state)
  const reduce = (accumulator, action) => {
    if (action.children) {
      for (const child of action.children) {
        reduce(accumulator, child)
      }
    }
    if (action.path) {
      accumulator.push(action.path)
    }
    return accumulator
  }
  return Object.values(actions).reduce(reduce, [])
}
