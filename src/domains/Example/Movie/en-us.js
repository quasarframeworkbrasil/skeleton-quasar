// import { primaryKey } from 'src/settings/schema'

import { SCOPES } from 'src/app/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Movies'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Movies'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Movie Trash',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Movie',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Movie',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Movie',
      crumb: 'Edit'
    }
  },
  form: {
    title: ''
  },
  table: {
    title: ''
  },
  fields: {
    // [primaryKey]: 'Id',
    name: 'Name',
    description: 'Description'
  },
  validation: {
    name: {
      custom: 'test custom'
    }
  }
}
