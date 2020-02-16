import { report } from 'src/domains/Report'

// noinspection JSUnusedLocalSymbols
/**
 * @param {VueRouter} router
 * @returns Array<RouteConfig>
 */
export default (router) => {
  const path = 'example'
  const component = () => import('src/views/dashboard/report/ExampleReport.vue')
  return report(path, component)
}
