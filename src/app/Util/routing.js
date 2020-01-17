import { SCOPES } from 'src/app/Agnostic/enum'
import { primaryKey } from 'src/settings/schema'

/**
 * @param {string} path
 * @param {string} redirect
 * @returns {Object}
 */
export const redirect = (path, redirect) => {
  return { path, redirect }
}

/**
 * @param {string} path
 * @param {Function} component
 * @param {string} [name]
 * @param {Object} [meta]
 * @returns {Object}
 */
export const route = (
  path,
  component,
  name = undefined,
  meta = {}
) => {
  return { path, name, component, meta }
}

/**
 * @param {string} path
 * @param {Function} component
 * @param {Array} [children]
 * @param {Record<string, any>} [meta]
 * @returns {Object}
 */
export const group = (
  path,
  component,
  children = [],
  meta = {}
) => {
  return { path, component, children, meta }
}

/**
 * @param {string} namespace
 * @param {string} path
 * @param {Function} table
 * @param {Function} form
 * @param {Object} [options]
 * @returns {Array}
 */
export const crud = (
  namespace,
  path,
  table,
  form,
  options = {}
) => {
  let key = primaryKey
  if (options && options.id) {
    key = options.id
    delete options.id
  }

  let prefix = namespace
  if (options && options.prefix) {
    prefix = options.prefix
    delete options.prefix
  }

  const meta = (scope) => ({ ...options, namespace, scope })
  return [
    route(`${path}`, table, `${prefix}.index`, meta(SCOPES.SCOPE_INDEX)),
    route(`${path}/trash`, table, `${prefix}.trash`, meta(SCOPES.SCOPE_TRASH)),
    route(`${path}/add`, form, `${prefix}.add`, meta(SCOPES.SCOPE_ADD)),
    route(`${path}/:${key}`, form, `${prefix}.view`, meta(SCOPES.SCOPE_VIEW)),
    route(`${path}/:${key}/edit`, form, `${prefix}.edit`, meta(SCOPES.SCOPE_EDIT))
  ]
}
