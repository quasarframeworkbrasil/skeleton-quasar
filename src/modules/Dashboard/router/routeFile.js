import { group, redirect, route } from 'src/app/Util/routing'

import { index, layout, notFound } from './components'
import { updateTransition } from './middleware'

// admin
import action from 'src/domains/Admin/Action/routes.js'
import profile from 'src/domains/Admin/Profile/routes.js'
import user from 'src/domains/Admin/User/routes.js'

// home
import home from 'src/domains/Home/Account/routes.js'

// report
import report from 'src/domains/Report/routes.js'

/**
 * @var {string}
 */
export const dashboard = '/dashboard/home'

/**
 * @param {AppRouter} router
 */
export default (router) => {
  //
  const routes = [
    redirect('', dashboard),
    route(dashboard, index, 'dashboard'),

    // admin namespace routes
    ...action(),
    ...profile(),
    ...user(),

    // home namespace routes
    ...home(),

    // report namespace routes
    ...report(router)
  ]

  router.addRoutes([group('/dashboard', layout, routes)])

  // update the transition of dashboard
  router.beforeEach(updateTransition)

  if (process.env.MODE !== 'ssr') {
    router.addRoutes([route('*', notFound)])
  }
}
