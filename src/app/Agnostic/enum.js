/**
 * @type {Object}
 */
export const SCOPES = {
  SCOPE_INDEX: 'scope-index',
  SCOPE_ADD: 'scope-add',
  SCOPE_VIEW: 'scope-view',
  SCOPE_EDIT: 'scope-edit',
  SCOPE_REMOVE: 'scope-remove',
  SCOPE_TRASH: 'scope-trash'
}

/**
 * @return {Array}
 */
export const scopes = () => Object.values(SCOPES)

/**
 * @type {Object}
 */
export const POSITIONS = {
  POSITION_TABLE_TOP: 'table-top',
  POSITION_TABLE_CELL: 'table-cell',
  POSITION_TABLE_FLOAT: 'table-float',
  POSITION_TABLE_SEARCH: 'table-search',
  POSITION_FORM_FOOTER: 'form-footer'
}

/**
 * @return {array}
 */
export const positions = () => Object.values(POSITIONS)
