import { group } from 'src/app/Util/routing'
import example from 'src/domains/Report/Example/route'

/**
 * @param {VueRouter} router
 * @returns Array<RouteConfig>
 */
export default (router) => {
  // index
  const index = () => import('src/modules/Group.vue')

  const children = [
    ...example(router)
  ]
  const meta = { namespace: 'report', scope: 'group', bread: false }
  return [
    group('/dashboard/report', index, children, meta)
  ]
}
