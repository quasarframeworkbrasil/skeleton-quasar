import { RouteConfig } from 'vue-router/types/router'
import { crud, group } from 'src/app/Util/routing'
import { domain, path } from './settings'

/**
 * @returns Array<RouteConfig>
 */
export default (): Array<RouteConfig> => {
  // index
  const index = () => import('src/layouts/Group.vue')
  // table
  const table = () => import('src/views/dashboard/admin/action/ActionTable.vue')
  // form
  const form = () => import('src/views/dashboard/admin/action/ActionForm.vue')

  const children = crud(domain, path, table, form)
  const meta = { namespace: domain, scope: 'group' }
  return [
    group(path, index, children, meta)
  ]
}
