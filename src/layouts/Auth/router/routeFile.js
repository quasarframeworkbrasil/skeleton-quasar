import { group } from 'src/app/Util/routing'
import { bootstrap, checkIsLogged, checkPermission } from './middleware'
import { otherwise } from 'src/router'

const layout = () => import('src/layouts/Auth/AuthLayout.vue')
const index = () => import('src/views/auth/AuthIndex.vue')

/**
 * @param {AppRouter} router
 */
export default (router) => {
  //
  const children = [{ path: '', component: index }]
  //
  router.addRoutes([group(otherwise, layout, children)])

  router.beforeEach(bootstrap)
  router.beforeThisRoute(otherwise, checkIsLogged)
  router.beforeEach(checkPermission)
}
