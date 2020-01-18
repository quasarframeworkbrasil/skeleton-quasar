import { group, redirect, route } from 'src/app/Util/routing'

import { index, layout, notFound } from './components'
import { updateTransition } from './middleware'

// admin
import action from 'src/domains/Admin/Action/route'
import profile from 'src/domains/Admin/Profile/route'
import user from 'src/domains/Admin/User/route'

// example
import movie from 'src/domains/Example/Movie/route'

// home
import home from 'src/domains/Home/route'

// report
import report from 'src/domains/Report/route'

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

    // example namespace routes
    ...movie(),

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
