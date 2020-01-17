// import { primaryKey } from 'src/settings/schema'

import { SCOPES } from 'src/app/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Users'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Users'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'User Trash',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create User',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View User',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit User',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'User Impression'
  },
  fields: {
    // [primaryKey]: 'Id',
    integration: 'API Key',
    name: 'Name',
    email: 'E-mail',
    profile: 'Profile',
    shop: 'Shop',
    active: {
      label: 'Active',
      inline: 'Allow access'
    },
    password: 'Password',
    confirmPassword: 'Password Confirmation'
  },
  validation: {
    email: {
      unique: 'E-mail already in use'
    },
    shop: {
      requiredIf: 'Shop is required to selected profile'
    },
    password: {
      requiredIf: 'Password is required to create user',
      regex: 'Password must have letters, numbers and at least six chars'
    },
    confirmPassword: {
      sameAs: 'Confirmation must match password'
    }
  }
}
