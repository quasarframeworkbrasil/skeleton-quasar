// import { primaryKey } from 'src/settings/schema'

import { SCOPES } from 'src/app/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Actions'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Actions'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Trash Bin',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Action',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Action',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Action',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'Action Print'
  },
  fields: {
    // [primaryKey]: 'Id',
    parent: 'Father',
    name: 'Name',
    namespace: 'Scope',
    icon: 'Icon',
    path: 'URL',
    assortment: 'Sort',
    separated: 'Separator'
  }
}
