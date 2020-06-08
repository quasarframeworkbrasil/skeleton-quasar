import { me } from 'src/domains/Auth/Service'
import allowed from 'src/modules/Auth/helper/allowed'
import bypass from 'src/modules/Auth/helper/bypass'
import { otherwise } from 'src/router'
import { dashboard } from 'src/modules/Dashboard/router/routeFile'
import { $store } from 'src/store'

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export const bootstrap = (to, from, next) => {
  if (bypass(to.path)) {
    next()
    return
  }
  if ($store.getters['auth/getUser']) {
    next()
    return
  }
  me()
    .then((user) => $store.dispatch('auth/updateUser', user))
    .then(() => next())
    .catch(() => next(otherwise))
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function checkPermission (to, from, next) {
  if (bypass(to.path, [dashboard])) {
    next()
    return
  }
  if (allowed(to.path)) {
    next()
    return
  }
  next({ path: otherwise, query: { forbidden: to.path } })
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function checkIsLogged (to, from, next) {
  if ($store.getters['auth/getToken']) {
    next(dashboard)
    return
  }
  next()
}
