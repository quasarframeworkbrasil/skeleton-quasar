import { $store } from 'src/store'

/**
 * @param {string} path
 * @returns {boolean}
 */
export default function (path) {
  const permissions = $store.getters['auth/getPermissions']
  for (const permission of permissions) {
    if (path === permission) {
      return true
    }
    if (path.indexOf(permission) === 0) {
      return true
    }
  }
  return false
}
