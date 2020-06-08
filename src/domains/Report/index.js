import { route } from 'src/app/Util/routing'

/**
 * @param {string} path
 * @param {Function} component
 * @returns {[RouteConfig]}
 */
export function report (path, component) {
  const reference = path.toCamelCase()
  const meta = {
    scope: 'report',
    namespace: `report.${reference}`
  }
  return [
    route(`/dashboard/report/${path}`, component, `report.${reference}`, meta)
  ]
}
