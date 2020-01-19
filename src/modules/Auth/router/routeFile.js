import { group, route } from 'src/app/Util/routing'
// import { bootstrap, checkIsLogged, checkPermission } from './middleware'
import { bootstrap, checkIsLogged } from './middleware'
import { otherwise } from 'src/router'

/**
 * @param {AppRouter} router
 */
export default (router) => {
  // the layout component
  const layout = () => import('src/modules/Auth/AuthLayout.vue')
  // sign in screen
  const index = () => import('src/views/auth/AuthIndex.vue')

  // auth routes definition
  const authRoutes = [
    route('', index) // sign in route
  ]
  // add auth routes
  router.addRoutes([
    group(otherwise, layout, authRoutes)
  ])

  // init the store user
  router.beforeEach(bootstrap)
  // check user is logged in app
  router.beforeThisRoute(otherwise, checkIsLogged)
  // check the permission to route
  // router.beforeEach(checkPermission)
}
