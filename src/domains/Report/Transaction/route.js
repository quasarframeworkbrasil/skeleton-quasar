import { report } from 'src/domains/Report'

// noinspection JSUnusedLocalSymbols
/**
 * @param {VueRouter} router
 * @returns Array<RouteConfig>
 */
export default (router) => {
  const path = 'transaction'
  const component = () => import('src/views/dashboard/report/TransactionReport.vue')
  return report(path, component)
}
