import { group } from 'src/app/Util/routing'
import transaction from 'src/domains/Report/Transaction/route'

/**
 * @param {VueRouter} router
 * @returns Array<RouteConfig>
 */
export default (router) => {
  // index
  const index = () => import('src/layouts/Group.vue')

  const children = [
    ...transaction(router)
  ]
  const meta = { namespace: 'report', scope: 'group', bread: false }
  return [
    group('/dashboard/report', index, children, meta)
  ]
}
