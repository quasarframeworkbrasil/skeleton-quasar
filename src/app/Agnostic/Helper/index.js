/**
 * @param {Object} fields
 * @param {string} field
 * @param {string} reference
 * @param {number} order
 */
export const fieldsReorder = (fields, field, reference, order) => {
  Object.keys(fields).forEach((key) => {
    if (key === field) {
      return
    }
    const element = fields[key]
    if (element.$layout[reference] < order) {
      return
    }
    element.$layout[reference] = element.$layout[reference] + 1
  })
}
