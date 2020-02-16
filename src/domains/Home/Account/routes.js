import { SCOPES } from 'src/app/Agnostic/enum.js'
import { route } from 'src/app/Util/routing.js'

/**
 * @type {string}
 */
export const accountPath = '/dashboard/home/account'

/**
 * @returns Array<RouteConfig>
 */
export default () => {
  // account page
  const account = () => import('src/views/dashboard/home/AccountForm.vue')

  const namespace = 'home'
  const scope = SCOPES.SCOPE_EDIT
  return [
    route(accountPath, account, 'account', { namespace, scope })
  ]
}
