import { route } from 'src/app/Util/routing'
import { SCOPES } from 'src/app/Agnostic/enum'

/**
 * @returns Array<RouteConfig>
 */
export default () => {
  // profile page
  const profile = () => import('src/views/dashboard/home/AccountForm.vue')

  const namespace = 'home'
  const scope = SCOPES.SCOPE_EDIT
  return [
    route('/dashboard/home/profile', profile, 'profile', { namespace, scope })
  ]
}
