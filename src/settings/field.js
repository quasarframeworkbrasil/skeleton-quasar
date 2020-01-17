/**
 * @param {string} $key
 * @param {Object} options
 * @param {Object} attrs
 * @param {Object} on
 * @returns {Object}
 */
export default ($key, options = {}, attrs = {}, on = {}) => {
  return {
    is: '',
    attrs,
    on,
    $key,
    $type: options.type,
    $validations: {},
    $layout: {
      formLabel: options.label || '',
      formWidth: options.width || 100,
      formHeight: options.height || 1,
      formHidden: false,
      formOrder: options.order,
      formError: true,
      tableLabel: options.label || '',
      tableWidth: 'auto',
      tableHidden: true,
      tableRequired: false,
      tableAlign: 'left',
      tableSortable: true,
      tableOrder: options.order,
      tableFormat: undefined,
      tableWhere: undefined
    },
    scopes: options.scopes,
    chars: ''
  }
}
